import { Component, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { GameStats } from 'src/app/interfaces/game-stats';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  DifficultyChange$!: Observable<string>;
  gameRunningSubject: Subject<boolean> = new Subject<boolean>();
  @Input() gameStats!: GameStats;
  @Output() runningState = new EventEmitter();

  constructor(
    private storage:StorageService
  ) { }

  cellClicked(row: number, column: number) {
    if(!this.gameStats.gameRunning) {
      this.runningState.emit(this.gameStats.gameRunning);
    }
  }

  counter(amount: number) {
    return new Array(amount);
  }
}
