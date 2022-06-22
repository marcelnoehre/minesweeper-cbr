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
    private tokens: TokensService
  ) { }

  ngOnInit(): void {
    this.tokens.remainingTokens$.subscribe((remainingTokens: number) => {
      this.remainingTokens = remainingTokens;
    });
    this.tokens.hintStatus$.subscribe((hintStatus: number) => {
      this.hintStatus = hintStatus;
    });
  }

  hintSelected(selectedHint: number) {
    if(this.hintStatus < selectedHint && this.remainingTokens >= selectedHint-this.hintStatus) {
      this.tokens.setRemainingTokens(this.remainingTokens-(selectedHint-this.hintStatus));
      this.tokens.setHintStatus(selectedHint);
    }
  }
}
