import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from 'src/app/enum/difficulty';
import { LanguageEnum } from 'src/app/enum/languages';
import { ResultEnum } from 'src/app/enum/result';
import { ActionService } from 'src/app/services/action-service';
import { GameStatsService } from 'src/app/services/gamestats.service';
import { StorageService } from 'src/app/services/storage.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  DifficultyChange$!: Observable<string>;
  difficulty!: string;
  gameRunning!: boolean;
  gameTime!: number;
  revealedCells!: number;
  totalCells!: number;
  cellsPerRow!: number;
  flagAmount!: number;
  remainingFlags!: number;
  bombAmount!: number;
  flaggedBombs!: number;
  isFlagMode!: boolean;
  loading: boolean = false;
  selectedLanguage:string = '';
  selectedDifficulty:string = '';
  languages:string[] = [LanguageEnum.english, LanguageEnum.german, LanguageEnum.french, LanguageEnum.spanish];
  difficulties: string[] = [DifficultyEnum.beginner, DifficultyEnum.advanced, DifficultyEnum.extreme];
  minutes: string = '00';
  seconds: string = '00';
  interval: any;

  constructor(
    private storage: StorageService,
    private gameStats: GameStatsService,
    private action: ActionService,
    private timer: TimerService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.DifficultyChange$ = this.storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
    this.DifficultyChange$.subscribe(newDifficulty => {
      this.timer.stop();
      this.difficulty = newDifficulty;
    });
    this.difficulty = this.storage.getSessionEntry('difficulty');
    this.selectedLanguage = this.storage.getSessionEntry('lang');
    this.selectedDifficulty = this.storage.getSessionEntry('difficulty');
    this.setDifficulty(this.storage.getSessionEntry('difficulty'));
    this.gameStats.gameRunning$.subscribe((gameRunning: boolean) => {
      if(gameRunning) {
        this.timer.start();
      } else {
        this.timer.stop();
      }
      this.gameRunning = gameRunning;
    });
    this.timer.gameTime$.subscribe((gameTime: number) => {
      this.gameTime = gameTime;
      let minutes = Math.floor(this.gameTime / 60);
      let seconds = this.gameTime % 60;
      this.minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      this.seconds = seconds < 10 ? '0' + seconds : '' + seconds; 
    });
    this.gameStats.revealedCells$.subscribe((revealedCells: number) => {
      if(revealedCells == this.totalCells - this.bombAmount) {
        this.gameStats.setGameRunning(false);
        this.action.openDialog(ResultEnum.win);
      }
      this.revealedCells = revealedCells;
    });
    this.gameStats.totalCells$.subscribe((totalCells: number) => {
      this.totalCells = totalCells;
    });
    this.gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
      this.cellsPerRow = cellsPerRow;
    });
    this.gameStats.flagAmount$.subscribe((flagAmount: number) => {
      this.flagAmount = flagAmount;
    });
    this.gameStats.remainingFlags$.subscribe((remainingFlags: number) => {
      this.remainingFlags = remainingFlags;
    });
    this.gameStats.bombAmount$.subscribe((bombAmount: number) => {
      this.bombAmount = bombAmount;
    });
    this.gameStats.flaggedBombs$.subscribe((flaggedBombs: number) => {
      this.flaggedBombs = flaggedBombs;
    });
    this.gameStats.isFlagMode$.subscribe((isFlagMode: boolean) => {
      this.isFlagMode = isFlagMode;
    });
  }

  openHandbook() {
    this.action.toggleHandbook(true);
  }

  toggleSetFlag() {
    this.gameStats.setIsFlagMode(this.isFlagMode? false : true);
  }

  setLanguage(lang:string): void {
    this.storage.setSessionEntry('lang', lang);
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  setDifficulty(difficulty:string): void {
    this.storage.setSessionEntry('difficulty', difficulty);
    this.action.restartGame();
  }

  restartGame() {
    this.action.restartGame();
  }
}
