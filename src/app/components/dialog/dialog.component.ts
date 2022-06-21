import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameStats } from 'src/app/interfaces/game-stats';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() result!: string;
  @Input() gameStats!: GameStats;
  @Input() totalTokens!: number;
  @Input() remainingTokens!: number;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {

  }
}
