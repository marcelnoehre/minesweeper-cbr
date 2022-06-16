import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss']
})
export class HintsComponent implements OnInit {
  remainingTokens:number = 10; 
  firstSelected: boolean = false;
  secondSelected:boolean = false;
  thirdSelected: boolean = false;

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  firstHint() {
    if(!this.firstSelected) {
      if(this.remainingTokens >= 1) {
        this.remainingTokens = this.remainingTokens -1;
        this.firstSelected = true;
        this.secondSelected = false;
        this.thirdSelected = false;
      }
    }
  }

  secondHint() {
    let tokens = this.remainingTokens;
    if(!this.secondSelected) {
      if(this.firstSelected) {
        tokens = tokens - 1;
      } else {
        tokens = tokens - 2;
      }
      if(tokens >= 0) {
        this.remainingTokens = tokens;
        this.firstSelected = true;
        this.secondSelected = true;
        this.thirdSelected = false;
      }
    }
  }

  thirdHint() {
    let tokens = this.remainingTokens;
    if(!this.thirdSelected) {
        if(this.secondSelected) {
          tokens = tokens - 1;
        } else if(this.firstSelected) {
          tokens = tokens - 2;
        } else {
          tokens = tokens - 3;
        }
        if(tokens >= 0) {
          this.remainingTokens = tokens;
          this.firstSelected = true;
          this.secondSelected = true;
          this.thirdSelected = true;
        }
      }
  }

  resetHints() {
    this.firstSelected = false;
    this.secondSelected = false;
    this.thirdSelected = false;
    let diff = this.storage.getSessionEntry('difficulty');
    if(diff == 'BEGINNER') {
      this.remainingTokens = 10;
    } else if (diff == 'ADVANCED') {
      this.remainingTokens = 15;
    } else {
      this.remainingTokens = 20;
    }
  }
}
