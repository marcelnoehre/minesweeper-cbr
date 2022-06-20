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
  @Output() remainingBombs = new EventEmitter();
  @Output() setFlag = new EventEmitter();
  @Output() dialog = new EventEmitter();
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

  cellClicked(row: number, column: number) {
    if(!this.gameStats.gameRunning) {
      this.runningState.emit(true);
      this.cellsPlanned = this.board.planned(this.gameStats.rowAmount, row, column, this.gameStats.bombAmount);
    }
    //TODO: detect left/right click
    //TODO: implement on screen right click alternative
    if(!this.gameStats.setFlag) { //left click
      if(this.cellsRevealed[row][column] == 'facingDown') {
        this.cellsRevealed[row][column] = this.cellsPlanned[row][column]
        if(this.cellsPlanned[row][column] == 'bomb') {
          //TODO: hit bomb animation to show lose dialog
          this.dialog.emit([]);
        } else if(this.cellsPlanned[row][column] == '0') {
          let tmp = this.board.openSurround(row, column, this.gameStats.rowAmount, this.cellsRevealed, this.cellsPlanned, 1);  
          this.cellsRevealed = tmp.revealed;
          this.revealedCells.emit(this.gameStats.revealedCells + tmp.revealedCounter);
        } else {
          this.revealedCells.emit(this.gameStats.revealedCells + 1);
        }
      }
    }
    if(this.gameStats.setFlag) { //right click
      if(this.cellsRevealed[row][column] == 'flagged') {
        this.cellsRevealed[row][column] = 'facingDown';
        this.remainingFlags.emit(this.gameStats.remainingFlags + 1);
        if (this.cellsPlanned[row][column] == 'bomb') {
          this.remainingBombs.emit(this.gameStats.flaggedBombs - 1);
        }
      } else if(this.gameStats.remainingFlags > 0 && this.cellsRevealed[row][column] == 'facingDown') {
        this.cellsRevealed[row][column] = 'flagged';
        this.remainingFlags.emit(this.gameStats.remainingFlags - 1);
        if(this.cellsPlanned[row][column] == 'bomb') {
          this.remainingBombs.emit(this.gameStats.flaggedBombs + 1);
        }
      }
      this.setFlag.emit(false);
    }
  }
}
