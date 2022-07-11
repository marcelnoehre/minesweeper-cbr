import { Component, OnInit } from '@angular/core';
import { TokensService } from 'src/app/services/tokens.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss']
})
export class HintsComponent implements OnInit {
  responsiveClass!: string;
  remainingTokens!: number;
  hintStatus!: number;

  constructor(
    private _tokens: TokensService,
    private breakpoints: BreakpointService
  ) { }

  ngOnInit(): void {
    this.breakpoints.responsiveClass$.subscribe((responsiveClass: string) => {
      this.responsiveClass = responsiveClass;
    });
    this._tokens.remainingTokens$.subscribe((remainingTokens: number) => {
      this.remainingTokens = remainingTokens;
    });
    this._tokens.hintStatus$.subscribe((hintStatus: number) => {
      this.hintStatus = hintStatus;
    });
    
  }

  hintSelected(selectedHint: number) {
    if(this.hintStatus < selectedHint && this.remainingTokens >= selectedHint-this.hintStatus) {
      this._tokens.setRemainingTokens(this.remainingTokens-(selectedHint-this.hintStatus));
      this._tokens.setHintStatus(selectedHint);
    }
  }
}
