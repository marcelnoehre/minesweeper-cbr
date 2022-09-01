import { Component, OnInit } from '@angular/core';
import { TokensService } from 'src/app/services/tokens.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { BoardService } from 'src/app/services/board.service';
import { PatternService } from 'src/app/services/pattern.service';
import { GameStatsService } from 'src/app/services/gamestats.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss']
})
export class HintsComponent implements OnInit {
  responsiveClass!: string;
  remainingTokens!: number;
  gameRunning!: boolean;
  hintStatus!: number;
  cellsRevealed!: string[][];
  hintText!: string;
  hintQueryRunning!: boolean;

  constructor(
    private _http: HttpClient,
    private _tokens: TokensService,
    private _breakpoints: BreakpointService,
    private _board: BoardService,
    private _gameStats: GameStatsService,
    private _pattern: PatternService
  ) { }

  ngOnInit(): void {
    this._breakpoints.responsiveClass$.subscribe((responsiveClass: string) => {
      this.responsiveClass = responsiveClass;
    });
    this._tokens.remainingTokens$.subscribe((remainingTokens: number) => {
      this.remainingTokens = remainingTokens;
    });
    this._gameStats.gameRunning$.subscribe((gameRunning: boolean) => {
      this.gameRunning = gameRunning;
    });
    this._tokens.hintStatus$.subscribe((hintStatus: number) => {
      this.hintStatus = hintStatus;
    });
    this._board.cellsRevealed$.subscribe((cellsRevealed: string[][]) => {
      this.cellsRevealed = cellsRevealed;
    });
    this._tokens.hintText$.subscribe((hintText: string) => {
      this.hintText = hintText;
    });
    this._tokens.hintQueryRunning$.subscribe((hintQueryRunning) => {
      this.hintQueryRunning = hintQueryRunning;
    });

  }

  async hintSelected(selectedHint: number) {
    if (!this.gameRunning) {//TODO load from json by key
      this._http.get<any>(`assets/solutions/solution-keys.json`).subscribe((value: any) => {
        this._tokens.setHintText(value['NO.GAME']);
      });
    } else {
      if (!this._tokens.noSolution) {
        if (this.hintStatus < selectedHint && this.remainingTokens >= selectedHint - this.hintStatus) {
          this._tokens.setRemainingTokens(this.remainingTokens - (selectedHint - this.hintStatus));
          this._tokens.setHintStatus(selectedHint);
          switch (selectedHint) {
            case 1: {
              if (!this._tokens.activeHint) {
                this._tokens.setActiveHint(true);
                await this._tokens.setupSolution();
              }
              break;
            }
            case 2: {
              if (!this._tokens.activeHint) {
                this._tokens.setActiveHint(true);
                await this._tokens.setupSolution();
              }
              if (!this._tokens.activeColorArea) {
                this._tokens.setActiveColorArea(true);
                await this._tokens.setupColoredArea();
              }
              break;
            }
            case 3: {
              if (!this._tokens.activeHint) {
                this._tokens.setActiveHint(true);
                await this._tokens.setupSolution();
              }
              this._tokens.turnCell();
              break;
            }
          }
        }
      }
    }
  }
}
