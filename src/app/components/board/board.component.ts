import { Component, Input, OnInit, Output } from '@angular/core';
import { filter, Observable, Subject, pluck } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { GameStats } from 'src/app/interfaces/game-stats';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  DifficultyChange$!: Observable<string>;
  gameRunningSubject: Subject<boolean> = new Subject<boolean>();
  @Input() gameStats!: GameStats;
  @Output() runningState = new EventEmitter();
  @Output() revealedCells = new EventEmitter();
  @Output() remainingFlags = new EventEmitter();
  public cells:string[][] = [];

  constructor(
    private storage:StorageService
  ) { }

  ngOnInit(): void {
    this.setupBoard(this.gameStats.difficulty);
    this.DifficultyChange$ = this.storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
    this.DifficultyChange$.subscribe(newDifficulty => {
      this.setupBoard(newDifficulty);
    });
  }

  setupBoard(diff: string) {
    if (diff == 'BEGINNER') {
      this.cells = [['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown']]
    } else if(diff == 'ADVANCED') {
      this.cells = [['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown']]
    } else {
      this.cells = [['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown'],['facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown','facingDown']]
    }
  }

  cellClicked(row: number, column: number) {
    if(!this.gameStats.gameRunning) {
      this.runningState.emit(true);
    }
    //if cell is not revealed
    this.revealedCells.emit(this.gameStats.revealedCells + 1);
    if(false) {
      //if right click 
      //add flag 
      this.remainingFlags.emit(this.gameStats.remainingFlags - 1);
      //remove flag
      this.remainingFlags.emit(this.gameStats.remainingFlags + 1);
    }
  }

  counter(amount: number) {
    return new Array(amount);
  }
}
