import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action-service';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-handbook',
  templateUrl: './handbook.component.html',
  styleUrls: ['./handbook.component.scss']
})
export class HandbookComponent implements OnInit {
  responsiveClass!: string;

  constructor(
    private _action: ActionService,
    private _breakpoints: BreakpointService
    ) { }

  ngOnInit(): void {
    this._breakpoints.responsiveClass$.subscribe((responsiveClass: string) => {
      this.responsiveClass = responsiveClass;
    });
  }

  closeHandbook() {
    this._action.toggleHandbook(false);
  }
}
