import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, pluck } from 'rxjs';
import { GameStatsService } from 'src/app/services/stats.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  DifficultyChange$!: Observable<string>;
  difficulty!: string;
  gameRunning!: boolean;
  revealedCells!: number;
  totalCells!: number;
  cellsPerRow!: number;
  flagAmount!: number;
  remainingFlags!: number;
  bombAmount!: number;
  flaggedBombs!: number;
  isFlagMode!: boolean;
  //TODO action Service
  @Output() restart = new EventEmitter;
  @Output() dialog = new EventEmitter;
  @Output() handbook = new EventEmitter;
  //TODO clean up
  public loading: boolean = false;
  public selectedLanguage:string = '';
  public languages:string[] = ['de', 'en', 'fr', 'es'];
  public selectedDifficulty:string = '';
  public difficulties: string[] = ['BEGINNER', 'ADVANCED', 'EXTREME'];
  public minutes: string = '00';
  public seconds: string = '00';
  public time: number = 0;
  private interval: any;

  constructor(
    private storage: StorageService,
    private gameStats: GameStatsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.DifficultyChange$ = this.storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
    this.DifficultyChange$.subscribe(newDifficulty => {
      this.stopTimer();
      this.difficulty = newDifficulty;
    });
    this.difficulty = this.storage.getSessionEntry('difficulty');
    this.selectedLanguage = this.storage.getSessionEntry('lang');
    this.selectedDifficulty = this.storage.getSessionEntry('difficulty');
    this.setDifficulty(this.storage.getSessionEntry('difficulty'));
    this.gameStats.gameRunning$.subscribe((gameRunning: boolean) => {
      if(gameRunning) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
      this.gameRunning = gameRunning;
    });
    this.gameStats.revealedCells$.subscribe((revealedCells: number) => {
      if(revealedCells == this.totalCells - this.bombAmount) {
        this.gameStats.setGameRunning(false);
        this.dialog.emit('win');
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
  }

  restartGame() {
    this.stopTimer();
    this.restart.emit(true);
  }

  startTimer() {
    this.time = 0;
    this.interval = setInterval(() => {
      this.time++;
      let minutes = Math.floor(this.time / 60);
      let seconds = this.time % 60;
      this.minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      this.seconds = seconds < 10 ? '0' + seconds : '' + seconds; 
    },1000)
  }

  stopTimer() {
    this.time = 0;
    this.minutes = '00';
    this.seconds = '00';
    clearInterval(this.interval);
  }

  openHandbook() {
    this.handbook.emit(true);
  }
}
