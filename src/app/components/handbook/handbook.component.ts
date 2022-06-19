import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-handbook',
  templateUrl: './handbook.component.html',
  styleUrls: ['./handbook.component.scss']
})
export class HandbookComponent implements OnInit {
  @Output() handbook = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandbook() {
    this.handbook.emit(false);
  }
}
