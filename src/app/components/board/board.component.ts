import { Component, OnInit } from '@angular/core';
import { filter, Observable, pluck } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { BoardService } from 'src/app/services/board.service';
import { GameStatsService } from 'src/app/services/gamestats.service';
import { ActionService } from 'src/app/services/action-service';
import { ResultEnum } from 'src/app/enum/result';
import { TokensService } from 'src/app/services/tokens.service';
import { TimerService } from 'src/app/services/timer.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  private _difficultyChange$!: Observable<string>;
  private _cellsPlanned: string[][] = [];
  private _gameRunning!: boolean;
  private _revealedCells!: number;
  private _cellsPerRow!: number;
  private _remainingFlags!: number;
  private _bombAmount!: number;
  private _flaggedBombs!: number;
  private _isFlagMode!: boolean;
  private _isFlagPermanently!: boolean;
  cellsRevealed:string[][] = [];
  difficulty!: string;
  responsiveClass!: string;


  constructor(
    private _storage:StorageService, 
    private _board:BoardService,
    private _gameStats: GameStatsService,
    private _timer: TimerService,
    private _tokens: TokensService,
    private _action: ActionService,
    private _breakpoints: BreakpointService
  ) { }

  ngOnInit(): void {
    this._difficultyChange$ = this._storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
      this._difficultyChange$.subscribe(newDifficulty => {
      this.difficulty = newDifficulty;
    });
    this.difficulty = this._storage.getSessionEntry('difficulty');
    this._breakpoints.responsiveClass$.subscribe((responsiveClass: string) => {
      this.responsiveClass = responsiveClass;
    });
    this._board.cellsRevealed$.subscribe((cellsRevealed: string[][]) => {
      this.cellsRevealed = cellsRevealed;
    });
    this._board.cellsPlanned$.subscribe((cellsPlanned: string[][]) => {
      this._cellsPlanned = cellsPlanned;
    });
    this._gameStats.gameRunning$.subscribe((gameRunning: boolean) => {
      this._gameRunning = gameRunning;
    });
    this._gameStats.revealedCells$.subscribe((revealedCells: number) => {
      this._revealedCells = revealedCells;
    });
    this._gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
      this._cellsPerRow = cellsPerRow;
    });
    this._gameStats.remainingFlags$.subscribe((remainingFlags: number) => {
      this._remainingFlags = remainingFlags;
    });
    this._gameStats.bombAmount$.subscribe((bombAmount: number) => {
      this._bombAmount = bombAmount;
    });
    this._gameStats.flaggedBombs$.subscribe((flaggedBombs: number) => {
      this._flaggedBombs = flaggedBombs;
    });
    this._gameStats.isFlagMode$.subscribe((isFlagMode: boolean) => {
      this._isFlagMode = isFlagMode;
    });
    this._gameStats.isFlagPermanently$.subscribe((isFlagPermanently: boolean) => {
      this._isFlagPermanently = isFlagPermanently;
    });
    this._board.setupRevealed(this._cellsPerRow);
  }

  async cellClicked(row: number, column: number) {
    if(!this._gameRunning) {
      this._gameStats.setGameRunning(true);
      this._board.setupPlanned(this._cellsPerRow, row, column, this._bombAmount);
    }
    if(!this._isFlagMode) {
      if(this.cellsRevealed[row][column] == 'facingDown') {
        this._tokens.setHintStatus(0);
        this._board.revealCell(row, column);
        if(this._cellsPlanned[row][column] == 'bomb') {
          this._timer.stop();
          await new Promise<void>(done => setTimeout(() => done(), 250));
          this._action.openDialog(ResultEnum.lose);
        } else if(this._cellsPlanned[row][column] == '0') { 
          this._gameStats.setRevealedCells(this._revealedCells + this._board.openSurround(row, column, this._cellsPerRow, 1)); 
        } else {
          this._gameStats.setRevealedCells(this._revealedCells + 1);
        }
      }
    } else {
      this.onRightClick(row, column);
    }
  }

  onRightClick(row: number, column: number) {
    if(!this._gameRunning) {
      this._gameStats.setGameRunning(true);
      this._board.setupPlanned(this._cellsPerRow, row, column, this._bombAmount);
    }
    if(this.cellsRevealed[row][column] == 'flagged') {
      this._board.setCellsRevealed(row, column, 'facingDown');
      this._gameStats.setRemainingFlags(this._remainingFlags+1);
      if (this._cellsPlanned[row][column] == 'bomb') {
        this._gameStats.setFlaggedBombs(this._flaggedBombs-1);
      }
      this._tokens.setHintStatus(0);
      if(!this._isFlagPermanently) {
        this._gameStats.setIsFlagMode(false);
      }
    } else if( this.cellsRevealed[row][column] == 'facingDown' && this._remainingFlags > 0) {
      this._board.setCellsRevealed(row, column, 'flagged');
      this._gameStats.setRemainingFlags(this._remainingFlags-1);
      if(this._cellsPlanned[row][column] == 'bomb') {
        this._gameStats.setFlaggedBombs(this._flaggedBombs+1);
      }
      this._tokens.setHintStatus(0);
      if(!this._isFlagPermanently) {
        this._gameStats.setIsFlagMode(false);
      }
    }
    return false
}
}
