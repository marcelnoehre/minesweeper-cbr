import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TranslateService} from "@ngx-translate/core";
import { Observable} from 'rxjs';
import { DialogComponent } from './components/dialog/dialog.component';
import { StorageService } from './services/storage.service';
import { GameStatsService } from './services/stats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  totalTokens$!: Observable<number>;
  remainingTokens$!: Observable<number>;
  public displayHandbook: boolean = false;
  title = 'minesweeper-cbr';

  constructor(
    private translate: TranslateService, 
    private storage: StorageService,
    private gameStats: GameStatsService,
    private dialog: MatDialog
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
    
  }
  
  toggleHandbook(event: any) {
    this.displayHandbook = event;
  }

  onRestart(event: any) {
    if(event == true) {
      
    }
  }

  onDialog(event: any[]) {
    let dialogRef = this.dialog.open(DialogComponent);
    let instance = dialogRef.componentInstance;
    instance.result = '' + event;
  }
}