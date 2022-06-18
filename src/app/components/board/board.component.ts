import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { filter, Observable, Subject, pluck } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { GameStats } from 'src/app/interfaces/game-stats';
import { EventEmitter } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges{
  DifficultyChange$!: Observable<string>;
  @Input() gameStats!: GameStats;
  @Output() runningState = new EventEmitter();
  @Output() revealedCells = new EventEmitter();
  @Output() remainingFlags = new EventEmitter();
  public cellsRevealed:string[][] = [];
  public cellsPlanned: string[][] = [];

  constructor(
    private storage:StorageService, 
    private board:BoardService
  ) { }

  ngOnInit(): void {
    this.setupBoard(this.gameStats.difficulty);
    this.DifficultyChange$ = this.storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
    this.DifficultyChange$.subscribe(newDifficulty => {
      this.setupBoard(newDifficulty);
    });
  }

  ngOnChanges(): void {
    if(!this.gameStats.gameRunning && this.cellsPlanned != []) {
      this.setupBoard(this.gameStats.difficulty);
    }
  }

  setupBoard(diff: string) {
    if (diff == 'BEGINNER') {
     this.cellsRevealed = this.board.facingDown(10);
    } else if(diff == 'ADVANCED') {
      this.cellsRevealed = this.board.facingDown(15);
    } else {
      this.cellsRevealed = this.board.facingDown(20);
    }
    this.cellsPlanned = [];
  }

  async cellClicked(row: number, column: number) {
    if(!this.gameStats.gameRunning) {
      this.runningState.emit(true);
      //TODO: fill first field without waiting
      this.cellsPlanned = await this.board.planned(this.gameStats.rowAmount, row, column);
    }
    //TODO: detect left right click
    //TODO: implement on screen right click alternative
    if(true) { //left click
      if(this.cellsRevealed[row][column] == 'facingDown')
      this.cellsRevealed[row][column] = this.cellsPlanned[row][column]
      this.revealedCells.emit(this.gameStats.revealedCells + 1);
    }
    if(false) { //right click
      if(this.cellsRevealed[row][column] == 'flagged') {
        this.cellsRevealed[row][column] = 'facingDown';
        this.remainingFlags.emit(this.gameStats.remainingFlags + 1);
      } else if(this.gameStats.remainingFlags > 0) {
        this.remainingFlags.emit(this.gameStats.remainingFlags - 1);
        this.cellsRevealed[row][column] = 'flagged';
      }
    }
  }

  counter(amount: number) {
    return new Array(amount);
  }
}
