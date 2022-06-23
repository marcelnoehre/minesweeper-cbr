import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { filter, Observable, pluck } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { EventEmitter } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { DifficultyEnum } from 'src/app/enum/difficulty';
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

  @Output() dialog = new EventEmitter();
  public cellsRevealed:string[][] = [];
  public cellsPlanned: string[][] = [];

  constructor(
    private storage:StorageService, 
    private board:BoardService,
    private gameStats: GameStatsService,
    private timer: TimerService,
    private tokens: TokensService,
    private action: ActionService
  ) { }

  ngOnInit(): void {
    this.DifficultyChange$ = this.storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
      this.DifficultyChange$.subscribe(newDifficulty => {
      this.difficulty = newDifficulty;
    });
    this.difficulty = this.storage.getSessionEntry('difficulty');
    this.board.cellsRevealed$.subscribe((cellsRevealed: string[][]) => {
      this.cellsRevealed = cellsRevealed;
    });
    this.board.cellsPlanned$.subscribe((cellsPlanned: string[][]) => {
      this.cellsPlanned = cellsPlanned;
    });
    this.gameStats.gameRunning$.subscribe((gameRunning: boolean) => {
      this.gameRunning = gameRunning;
    });
    this.gameStats.revealedCells$.subscribe((revealedCells: number) => {
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
    this.board.setupRevealed(this.cellsPerRow);
  }

  async cellClicked(row: number, column: number) {
    if(!this.gameRunning) {
      this.gameStats.setGameRunning(true);
      this.board.setupPlanned(this.cellsPerRow, row, column, this.bombAmount);
    }
    this.tokens.setHintStatus(0);
    if(!this.isFlagMode) {
      if(this.cellsRevealed[row][column] == 'facingDown') {
        this.board.revealCell(row, column);
        if(this.cellsPlanned[row][column] == 'bomb') {
          this.timer.stop();
          await new Promise<void>(done => setTimeout(() => done(), 250));
          this.action.openDialog(ResultEnum.lose);
        } else if(this.cellsPlanned[row][column] == '0') { 
          this.gameStats.setRevealedCells(this.revealedCells + this.board.openSurround(row, column, this.cellsPerRow, 1)); 
        } else {
          this.gameStats.setRevealedCells(this.revealedCells + 1);
        }
      }
    } else {
      //TODO: detect right click
      if(this.cellsRevealed[row][column] == 'flagged') {
        this.board.setCellsRevealed(row, column, 'facingDown');
        this.gameStats.setRemainingFlags(this.remainingFlags+1);
        if (this.cellsPlanned[row][column] == 'bomb') {
          this.gameStats.setFlaggedBombs(this.flaggedBombs-1);
        }
      } else if( this.cellsRevealed[row][column] == 'facingDown' && this.remainingFlags > 0) {
        this.board.setCellsRevealed(row, column, 'flagged');
        this.gameStats.setRemainingFlags(this.remainingFlags-1);
        if(this.cellsPlanned[row][column] == 'bomb') {
          this.gameStats.setFlaggedBombs(this.flaggedBombs+1);
        }
      }
      this.gameStats.setIsFlagMode(false);
    }
  }
}
