import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action-service';
import { GameStatsService } from 'src/app/services/gamestats.service';
import { TimerService } from 'src/app/services/timer.service';
import { TokensService } from 'src/app/services/tokens.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() result!: string;
  difficulty!: string;
  revealedCells!: number;
  cellsPerRow!: number;
  totalCells!: number;
  flagAmount!: number;
  remainingFlags!: number;
  bombAmount!: number;
  flaggedBombs!: number;
  totalTokens!: number;
  remainingTokens!: number;
  gameTime!: number;
  minutes!: string;
  seconds!: string;

  constructor(
    private gameStats: GameStatsService,
    private tokens: TokensService,
    private action: ActionService,
    private timer: TimerService
    ) { }

  ngOnInit(): void {
    this.timer.gameTime$.subscribe((gameTime: number) => {
      this.gameTime = gameTime;
      let minutes = Math.floor(this.gameTime / 60);
      let seconds = this.gameTime % 60;
      this.minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      this.seconds = seconds < 10 ? '0' + seconds : '' + seconds; 
    });
    
    this.gameStats.revealedCells$.subscribe((revealedCells: number) => {
      this.revealedCells = revealedCells;
    });
    this.gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
      this.cellsPerRow = cellsPerRow;
    });
    this.gameStats.totalCells$.subscribe((totalCells: number) => {
      this.totalCells = totalCells;
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
    this.tokens.totalTokens$.subscribe((totalTokens: number) => {
      this.totalTokens = totalTokens;
    });
    this.tokens.remainingTokens$.subscribe((remainingTokens: number) => {
      this.remainingTokens = remainingTokens;
    });
  }

  ngOnDestroy(): void {
    this.action.restartGame();
  }
}
