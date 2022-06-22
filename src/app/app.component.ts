import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Observable} from 'rxjs';
import { StorageService } from './services/storage.service';
import { GameStatsService } from './services/stats.service';
import { ActionService } from './services/action-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayHandbook: boolean = false;
  title = 'minesweeper-cbr';

  constructor(
    private translate: TranslateService, 
    private storage: StorageService,
    private action: ActionService
    ) {
    translate.setDefaultLang('en');
    let lang = null;
    try {
      lang = storage.getSessionEntry('lang');
    } catch(err) {}  
    lang = lang? lang : 'en';
    storage.setSessionEntry('lang', lang);
    translate.use(lang);
    let diff = null;
    try {
      diff = this.storage.getSessionEntry('difficulty');
    } catch(err) {}
    diff = diff? diff : 'BEGINNER';
    storage.setSessionEntry('difficulty', diff)
  }

  ngOnInit(): void {
    this.action.displayHandbook.subscribe((displayHandbook) => {
      this.displayHandbook = displayHandbook;
    });
  }

  onRestart(event: any) {
    if(event == true) {
      
    }
  }
}