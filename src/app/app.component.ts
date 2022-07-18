import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { ActionService } from './services/action-service';
import { DifficultyEnum } from './enum/difficulty';
import { BreakpointService } from './services/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayHandbook: boolean = false;
  responsiveClass!: string;

  title = 'minesweeper-cbr';

  constructor(
    private storage: StorageService,
    private action: ActionService,
    private breakpoints: BreakpointService
  ) {
    let diff: string = '';
    try {
      diff = this.storage.getSessionEntry('difficulty');
    } catch (err) { }
    diff = diff ? diff : DifficultyEnum.beginner;
    storage.setSessionEntry('difficulty', diff);
  }

  ngOnInit(): void {
    this.breakpoints.responsiveClass$.subscribe((responsiveClass: string) => {
      this.responsiveClass = responsiveClass;
    });
    this.action.displayHandbook.subscribe((displayHandbook) => {
      this.displayHandbook = displayHandbook;
    });
  }

}