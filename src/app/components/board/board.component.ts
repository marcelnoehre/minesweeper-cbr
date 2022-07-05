import { Component, OnInit } from '@angular/core';
import { filter, Observable, pluck } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { BoardService } from 'src/app/services/board.service';
import { GameStatsService } from 'src/app/services/gamestats.service';
import { ActionService } from 'src/app/services/action-service';
import { ResultEnum } from 'src/app/enum/result';
import { TokensService } from 'src/app/services/tokens.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
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
  isFlagPermanently!: boolean;
  cellsRevealed:string[][] = [];
  cellsPlanned: string[][] = [];

  constructor(
    private _storage:StorageService, 
    private _board:BoardService,
    private _gameStats: GameStatsService,
    private _timer: TimerService,
    private _tokens: TokensService,
    private _action: ActionService
  ) { }

  ngOnInit(): void {
    this.DifficultyChange$ = this._storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
      this.DifficultyChange$.subscribe(newDifficulty => {
      this.difficulty = newDifficulty;
    });
    this.difficulty = this._storage.getSessionEntry('difficulty');
    this._board.cellsRevealed$.subscribe((cellsRevealed: string[][]) => {
      this.cellsRevealed = cellsRevealed;
    });
    this._board.cellsPlanned$.subscribe((cellsPlanned: string[][]) => {
      this.cellsPlanned = cellsPlanned;
    });
    this._gameStats.gameRunning$.subscribe((gameRunning: boolean) => {
      this.gameRunning = gameRunning;
    });
    this._gameStats.revealedCells$.subscribe((revealedCells: number) => {
      this.revealedCells = revealedCells;
    });
    this._gameStats.totalCells$.subscribe((totalCells: number) => {
      this.totalCells = totalCells;
    });
    this._gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
      this.cellsPerRow = cellsPerRow;
    });
    this._gameStats.flagAmount$.subscribe((flagAmount: number) => {
      this.flagAmount = flagAmount;
    });
    this._gameStats.remainingFlags$.subscribe((remainingFlags: number) => {
      this.remainingFlags = remainingFlags;
    });
    this._gameStats.bombAmount$.subscribe((bombAmount: number) => {
      this.bombAmount = bombAmount;
    });
    this._gameStats.flaggedBombs$.subscribe((flaggedBombs: number) => {
      this.flaggedBombs = flaggedBombs;
    });
    this._gameStats.isFlagMode$.subscribe((isFlagMode: boolean) => {
      this.isFlagMode = isFlagMode;
    });
    this._gameStats.isFlagPermanently$.subscribe((isFlagPermanently: boolean) => {
      this.isFlagPermanently = isFlagPermanently;
    });
    this._board.setupRevealed(this.cellsPerRow);
  }

  async cellClicked(row: number, column: number) {
    if(!this.gameRunning) {
      this._gameStats.setGameRunning(true);
      this._board.setupPlanned(this.cellsPerRow, row, column, this.bombAmount);
    }
    if(!this.isFlagMode) {
      if(this.cellsRevealed[row][column] == 'facingDown') {
        this._tokens.setHintStatus(0);
        this._board.revealCell(row, column);
        if(this.cellsPlanned[row][column] == 'bomb') {
          this._timer.stop();
          await new Promise<void>(done => setTimeout(() => done(), 250));
          this._action.openDialog(ResultEnum.lose);
        } else if(this.cellsPlanned[row][column] == '0') { 
          this._gameStats.setRevealedCells(this.revealedCells + this._board.openSurround(row, column, this.cellsPerRow, 1)); 
        } else {
          this._gameStats.setRevealedCells(this.revealedCells + 1);
        }
      }
    } else {
      this.onRightClick(row, column);
    }
  }

  onRightClick(row: number, column: number) {
    if(!this.gameRunning) {
      this._gameStats.setGameRunning(true);
      this._board.setupPlanned(this.cellsPerRow, row, column, this.bombAmount);
    }
    if(this.cellsRevealed[row][column] == 'flagged') {
      this._board.setCellsRevealed(row, column, 'facingDown');
      this._gameStats.setRemainingFlags(this.remainingFlags+1);
      if (this.cellsPlanned[row][column] == 'bomb') {
        this._gameStats.setFlaggedBombs(this.flaggedBombs-1);
      }
      this._tokens.setHintStatus(0);
      if(!this.isFlagPermanently) {
        this._gameStats.setIsFlagMode(false);
      }
    } else if( this.cellsRevealed[row][column] == 'facingDown' && this.remainingFlags > 0) {
      this._board.setCellsRevealed(row, column, 'flagged');
      this._gameStats.setRemainingFlags(this.remainingFlags-1);
      if(this.cellsPlanned[row][column] == 'bomb') {
        this._gameStats.setFlaggedBombs(this.flaggedBombs+1);
      }
      this._tokens.setHintStatus(0);
      if(!this.isFlagPermanently) {
        this._gameStats.setIsFlagMode(false);
      }
    }
    return false
}
}
