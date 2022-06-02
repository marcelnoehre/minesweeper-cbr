import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public rowAmount: number = 10;
  public cellsPerRow: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

  counter(amount: number) {
    return new Array(amount);
  }
}
