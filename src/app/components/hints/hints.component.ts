import { Component, OnInit } from '@angular/core';
import { TokensService } from 'src/app/services/tokens.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss']
})
export class HintsComponent implements OnInit {
  remainingTokens!: number;
  hintStatus!: number;

  constructor(
    private _tokens: TokensService
  ) { }

  ngOnInit(): void {
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
