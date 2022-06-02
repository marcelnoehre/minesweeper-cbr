import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public difficulty: string = ''
  public rowAmount: number = 0;
  public cellsPerRow: number = 0;

  constructor(
    private storage:StorageService
  ) { }

  ngOnInit(): void {
    this.setupBoard();
  }

  setupBoard() {
    this.difficulty = this.storage.getSessionEntry('difficulty');
    if(this.difficulty == 'BEGINNER') {
      this.rowAmount = 9; 
      this.cellsPerRow = 9;
    } else if (this.difficulty == 'ADVANCED') {
      this.rowAmount = 16;
      this.cellsPerRow = 16;
    } else {
      this.rowAmount = 25;
      this.cellsPerRow = 25;
    }
  }

  counter(amount: number) {
    return new Array(amount);
  }
}
