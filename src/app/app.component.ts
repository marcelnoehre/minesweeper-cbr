import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minesweeper-cbr';

  constructor(
    private translate: TranslateService, 
    private storage: StorageService
    ) {
    translate.setDefaultLang('de');
    let lang = null;
    try {
      lang = storage.getSessionEntry('lang');
    } catch(err) {}  
    lang = lang? lang : 'de';
    storage.setSessionEntry('lang', lang);
    translate.use(lang);
  }
}