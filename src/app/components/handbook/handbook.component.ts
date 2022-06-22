import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionService } from 'src/app/services/action-service';

@Component({
  selector: 'app-handbook',
  templateUrl: './handbook.component.html',
  styleUrls: ['./handbook.component.scss']
})
export class HandbookComponent implements OnInit {
  @Output() handbook = new EventEmitter;

  constructor(private action: ActionService) { }

  ngOnInit(): void {
  }

  closeHandbook() {
    this.action.toggleHandbook(false);
  }
}
