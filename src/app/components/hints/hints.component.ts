import { Component, OnInit } from '@angular/core';
import { TokensService } from 'src/app/services/tokens.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { BoardService } from 'src/app/services/board.service';
import { PatternService } from 'src/app/services/pattern.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss']
})
export class HintsComponent implements OnInit {
  responsiveClass!: string;
  remainingTokens!: number;
  hintStatus!: number;
  cellsRevealed!: string[][];

  constructor(
    private _tokens: TokensService,
    private _breakpoints: BreakpointService,
    private _board: BoardService,
    private _pattern: PatternService
  ) { }

  ngOnInit(): void {
    this._breakpoints.responsiveClass$.subscribe((responsiveClass: string) => {
      this.responsiveClass = responsiveClass;
    });
    this._tokens.remainingTokens$.subscribe((remainingTokens: number) => {
      this.remainingTokens = remainingTokens;
    });
    this._tokens.hintStatus$.subscribe((hintStatus: number) => {
      this.hintStatus = hintStatus;
    });
    this._board.cellsRevealed$.subscribe((cellsRevealed: string[][]) => {
      this.cellsRevealed = cellsRevealed;
    });
  }

  hintSelected(selectedHint: number) {
    this._pattern.getSolution();
    if(this.hintStatus < selectedHint && this.remainingTokens >= selectedHint-this.hintStatus) {
      this._tokens.setRemainingTokens(this.remainingTokens-(selectedHint-this.hintStatus));
      this._tokens.setHintStatus(selectedHint);
    }
  }
}
