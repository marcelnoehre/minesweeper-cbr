import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameStats } from 'src/app/interfaces/game-stats';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() result!: string;
  @Input() gameStats!: GameStats;
  totalTokens!: number;
  remainingTokens!: number;

  constructor(
    private stats: StatsService,
    private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.stats.totalTokens$.subscribe((totalTokens: number) => {
      this.totalTokens = totalTokens;
    });
    this.stats.remainingTokens$.subscribe((remainingTokens: number) => {
      this.remainingTokens = remainingTokens;
    });
  }
}
