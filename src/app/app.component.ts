import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { StorageService } from './services/storage.service';
import { ActionService } from './services/action-service';
import { LanguageEnum } from './enum/languages';
import { BrowserLanguageEnum } from './enum/browser-languages';
import { DifficultyEnum } from './enum/difficulty';

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
    translate.setDefaultLang(LanguageEnum.english);
    let lang: string = '';
    try {
      lang = storage.getSessionEntry('lang');
    } catch(err) {}  
    if(!lang) {
      switch (navigator.language) {
        case BrowserLanguageEnum.german: {
          lang = LanguageEnum.german;
          break;
        }
        case BrowserLanguageEnum.french: {
          lang = LanguageEnum.french;
          break;
        }
        case BrowserLanguageEnum.spanish: {
          lang = LanguageEnum.spanish;
          break;
        }
        default:
          lang = LanguageEnum.english;
        }
      }
    storage.setSessionEntry('lang', lang);
    translate.use(lang);
    let diff: string = '';
    try {
      diff = this.storage.getSessionEntry('difficulty');
    } catch(err) {}
    diff = diff == ''? DifficultyEnum.beginner: diff;
    storage.setSessionEntry('difficulty', diff);
  }

  ngOnInit(): void {
    this.action.displayHandbook.subscribe((displayHandbook) => {
      this.displayHandbook = displayHandbook;
    });
  }
}