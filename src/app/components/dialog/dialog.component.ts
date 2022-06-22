import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameStats } from 'src/app/interfaces/game-stats';
import { TokensService } from 'src/app/services/tokens.service';

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
    private tokens: TokensService,
    private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.tokens.totalTokens$.subscribe((totalTokens: number) => {
      this.totalTokens = totalTokens;
    });
    this.tokens.remainingTokens$.subscribe((remainingTokens: number) => {
      this.remainingTokens = remainingTokens;
    });
  }
}
