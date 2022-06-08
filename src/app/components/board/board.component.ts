import { Component, OnInit } from '@angular/core';
import { filter, Observable, pluck } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { GameStats } from 'src/app/interfaces/game-stats';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
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
    remainingBombs: 10
  }

  constructor(
    private storage:StorageService
  ) { }

  async ngOnInit(): Promise<void> {
      this.DifficultyChange$ = this.storage.storageChange$.pipe(
        filter(({ key }) => key === "difficulty"),
        pluck("id")
      );
      this.DifficultyChange$.subscribe(newDifficulty => {
        this.gameStats.difficulty = newDifficulty;
        this.setupBoard();
      });
    this.setupBoard();
  }

  setupBoard() {
    this.gameStats.difficulty = this.storage.getSessionEntry('difficulty');
    if(this.gameStats.difficulty == 'BEGINNER') {
      this.gameStats.totalCells = 81;
      this.gameStats.revealedCells = 0;
      this.gameStats.rowAmount = 9; 
      this.gameStats.cellsPerRow = 9;
    } else if (this.gameStats.difficulty == 'ADVANCED') {
      this.gameStats.totalCells = 256;
      this.gameStats.revealedCells = 0;
      this.gameStats.rowAmount = 16;
      this.gameStats.cellsPerRow = 16;
    } else {
      this.gameStats.totalCells = 625;
      this.gameStats.revealedCells = 0;
      this.gameStats.rowAmount = 25;
      this.gameStats.cellsPerRow = 25;
    }
  }

  counter(amount: number) {
    return new Array(amount);
  }
}
