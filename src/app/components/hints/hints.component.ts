import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  firstHint() {
    if(!this.firstSelected) {
      this.firstSelected = true;
      this.secondSelected = false;
      this.thirdSelected = false;
    }
  }

  secondHint() {
    if(!this.secondSelected) {
      this.firstSelected = true;
      this.secondSelected = true;
      this.thirdSelected = false;
    }
  }

  thirdHint() {
    if(!this.thirdSelected) {
      this.firstSelected = true;
      this.secondSelected = true;
      this.thirdSelected = true;
    }
  }

  resetHints() {
    this.firstSelected = false;
    this.secondSelected = false;
    this.thirdSelected = false;
  }
}
