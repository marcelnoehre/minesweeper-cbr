import { Component, Input, OnInit, Output } from '@angular/core';
import { filter, Observable, pluck } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { GameStats } from 'src/app/interfaces/game-stats';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  DifficultyChange$!: Observable<string>;
  @Input() gameStats!: GameStats;

  constructor(
    private storage:StorageService
  ) { }

  counter(amount: number) {
    return new Array(amount);
  }
}
