import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { ActionService } from './services/action-service';
import { DifficultyEnum } from './enum/difficulty';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayHandbook: boolean = false;
  
  display : { [key: string]: any } = {
    isHandset: false,
    isHandsetLandscape: false,
    isHandsetPortrait: false,
    isLarge: false,
    isMedium: false,
    isSmall: false,
    isTablet: false,
    isTabletLandscape: false,
    isTabletPortrait: false,
    isWeb: false,
    isWebLandscape: false,
    isWebPortrait: false,
    isXLarge: false,
    isXSmall: false,
  };

  title = 'minesweeper-cbr';

  constructor(
    private storage: StorageService,
    private action: ActionService,
    private responsive: BreakpointObserver,
  ) {
    let diff: string = '';
    try {
      diff = this.storage.getSessionEntry('difficulty');
    } catch (err) { }
    diff = diff ? diff : DifficultyEnum.beginner;
    storage.setSessionEntry('difficulty', diff);
  }

  ngOnInit(): void {
    this.action.displayHandbook.subscribe((displayHandbook) => {
      this.displayHandbook = displayHandbook;
    });

    this.responsive.observe([
      Breakpoints.Handset,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small,
      Breakpoints.Tablet,
      Breakpoints.TabletLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.Web,
      Breakpoints.WebLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.XLarge,
      Breakpoints.XSmall])
      .subscribe(result => {

        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.Handset]) {
          this.displayMode("isHandset");
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.displayMode("isHandsetLandscape");
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.displayMode("isHandsetPortrait");
        } else if (breakpoints[Breakpoints.Large]) {
          this.displayMode("isLarge");
        } else if (breakpoints[Breakpoints.Medium]) {
          this.displayMode("isMedium");
        } else if (breakpoints[Breakpoints.Small]) {
          this.displayMode("isSmall");
        } else if (breakpoints[Breakpoints.Tablet]) {
          this.displayMode("isTablet");
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.displayMode("isTabletLandscape");
        } else if (breakpoints[Breakpoints.TabletPortrait]) {
          this.displayMode("isTabletPortrait");
        } else if (breakpoints[Breakpoints.Web]) {
          this.displayMode("isWeb");
        } else if (breakpoints[Breakpoints.WebLandscape]) {
          this.displayMode("isWebLandscape");
        } else if (breakpoints[Breakpoints.WebPortrait]) {
          this.displayMode("isWebPortrait");
        } else if (breakpoints[Breakpoints.XLarge]) {
          this.displayMode("isXLarge");
        } else if (breakpoints[Breakpoints.XSmall]) {
          this.displayMode("XSmall");
        }
      })
  }

  displayMode(mode: string) {
    for (let displaymode of Object.keys(this.display)) {
      if (displaymode == mode) {
        this.display[displaymode] = true;
        console.log(displaymode, " = true")
      } else {
        this.display[displaymode] = false;
      }
    }
  }
}