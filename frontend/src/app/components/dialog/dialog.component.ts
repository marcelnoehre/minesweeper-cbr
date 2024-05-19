import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action-service';
import { ApiService } from 'src/app/services/api.service';
import { GameStatsService } from 'src/app/services/gamestats.service';
import { PatternService } from 'src/app/services/pattern.service';
import { TimerService } from 'src/app/services/timer.service';
import { TokensService } from 'src/app/services/tokens.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() result!: string;
  revealedCells!: number;
  cellsPerRow!: number;
  totalCells!: number;
  flagAmount!: number;
  remainingFlags!: number;
  mineAmount!: number;
  flaggedmines!: number;
  totalTokens!: number;
  remainingTokens!: number;
  gameTime!: number;
  minutes!: string;
  seconds!: string;

  constructor(
    private _gameStats: GameStatsService,
    private _tokens: TokensService,
    private _action: ActionService,
    private _timer: TimerService,
    private _api: ApiService,
    private _pattern: PatternService
    ) { }

  async ngOnInit(): Promise<void> {
    this._timer.gameTime$.subscribe((gameTime: number) => {
      this.gameTime = gameTime;
      let minutes = Math.floor(this.gameTime / 60);
      let seconds = this.gameTime % 60;
      this.minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      this.seconds = seconds < 10 ? '0' + seconds : '' + seconds; 
    });
    
    this._gameStats.revealedCells$.subscribe((revealedCells: number) => {
      this.revealedCells = revealedCells;
    });
    this._gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
      this.cellsPerRow = cellsPerRow;
    });
    this._gameStats.totalCells$.subscribe((totalCells: number) => {
      this.totalCells = totalCells;
    });
    this._gameStats.flagAmount$.subscribe((flagAmount: number) => {
      this.flagAmount = flagAmount;
    });
    this._gameStats.remainingFlags$.subscribe((remainingFlags: number) => {
      this.remainingFlags = remainingFlags;
    });
    this._gameStats.mineAmount$.subscribe((mineAmount: number) => {
      this.mineAmount = mineAmount;
    });
    this._gameStats.flaggedmines$.subscribe((flaggedmines: number) => {
      this.flaggedmines = flaggedmines;
    });
    this._tokens.totalTokens$.subscribe((totalTokens: number) => {
      this.totalTokens = totalTokens;
    });
    this._tokens.remainingTokens$.subscribe((remainingTokens: number) => {
      this.remainingTokens = remainingTokens;
    });
    await this._api.addCaseCall(this._pattern.getCaseCollection);
    this._pattern.resetCaseCollection();
  }

  ngOnDestroy(): void {
    this._action.restartGame();
  }
}
