import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {
  public rowAmount: number = 10;
  public cellsPerRow: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

  counter(amount: number) {
    return new Array(amount);
  }
}
