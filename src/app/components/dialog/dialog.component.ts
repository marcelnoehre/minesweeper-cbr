import { Component, Input, OnInit } from '@angular/core';
import { GameStats } from 'src/app/interfaces/game-stats';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() result!: string;
  @Input() gameStats!: GameStats;

  constructor() { }

  ngOnInit(): void {

  }

}
