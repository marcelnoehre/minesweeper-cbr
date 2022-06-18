import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { filter, Observable, pluck } from 'rxjs';
import { GameStats } from './interfaces/game-stats';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  DifficultyChange$!: Observable<string>;
  public gameStats: GameStats = {
    difficulty: 'BEGINNER',
    revealedCells: 0,
    totalCells: 81,
    rowAmount: 9,
    cellsPerRow: 9,
    flagAmount: 10,
    remainingFlags: 10,
    bombAmount: 10,
    remainingBombs: 10,
    gameRunning: false
  }
  title = 'minesweeper-cbr';

  constructor(
    private translate: TranslateService, 
    private storage: StorageService
    ) {
    translate.setDefaultLang('en');
    let lang = null;
    try {
      lang = storage.getSessionEntry('lang');
    } catch(err) {}  
    lang = lang? lang : 'en';
    storage.setSessionEntry('lang', lang);
    translate.use(lang);
    let diff = null;
    try {
      diff = this.storage.getSessionEntry('difficulty');
    } catch(err) {}
    diff = diff? diff : 'BEGINNER';
    storage.setSessionEntry('difficulty', diff)
  }

  ngOnInit(): void {
    this.DifficultyChange$ = this.storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
    this.DifficultyChange$.subscribe(newDifficulty => {
      this.gameStats.difficulty = newDifficulty;
      this.setup();
    });
    this.setup();
  }

  setup() {
    const diff = this.storage.getSessionEntry('difficulty');
    if(diff == 'BEGINNER') {
      this.gameStats = {
        difficulty: 'BEGINNER',
        revealedCells: 0,
        totalCells: 100,
        rowAmount: 10,
        cellsPerRow: 10,
        flagAmount: 10,
        remainingFlags: 10,
        bombAmount: 10,
        remainingBombs: 10, 
        gameRunning: false
      }
    } else if(diff == 'ADVANCED') {
      this.gameStats = {
        difficulty: 'ADVANCED',
        revealedCells: 0,
        totalCells: 225,
        rowAmount: 15,
        cellsPerRow: 15,
        flagAmount: 30,
        remainingFlags: 30,
        bombAmount: 30,
        remainingBombs: 30, 
        gameRunning: false
      }
    } else {
      this.gameStats = {
        difficulty: 'EXTREME',
        revealedCells: 0,
        totalCells: 400,
        rowAmount: 20,
        cellsPerRow: 20,
        flagAmount: 40,
        remainingFlags: 40,
        bombAmount: 40,
        remainingBombs: 40, 
        gameRunning: false
      }
    }
  }

  onRunningStatusChanged(event: any) {
    this.gameStats = {...this.gameStats, gameRunning: event};
  }

  onCellRevealed(event: any) {
    this.gameStats = {...this.gameStats, revealedCells: event};
  }

  onFlagsChanged(event: any) {
    this.gameStats = {...this.gameStats, remainingFlags: event};
  }

  onRestart(event: any) {
    if(event == true) {
      this.setup();
    }
  }
}