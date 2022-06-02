import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public selectedLanguage:string = '';
  public languagesDefault:string[] = ['de', 'en', 'fr', 'es']
  public languages:string[] = [];
  public selectedDifficulty:string = 'easy';
  public difficulties: string[] = ['easy', 'medium', 'hard'];


  constructor(
    private storage: StorageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.selectedLanguage = this.storage.getSessionEntry('lang');
    this.getLanguages();
    this.setupDifficulty();
  }

  newLanguage(lang:string): void {
    this.storage.setSessionEntry('lang', lang);
    this.selectedLanguage = lang;
    this.translate.use(lang);
    this.getLanguages();
  }

  public getLanguages(): void {
    this.languages = [];
    for(let i = 0; i < 4; i++) {
      if(this.selectedLanguage != this.languagesDefault[i]) {
        this.languages.push(this.languagesDefault[i]);
      }
    }
  }

  setupDifficulty() {
    let diff = null;
    try {
      diff = this.storage.getSessionEntry('difficulty');
    } catch(err) {}
    diff = diff? diff : 'easy';
    this.selectedDifficulty = diff;
    this.storage.setSessionEntry('difficulty', this.selectedDifficulty);
  }

  newDifficulty(difficulty:string): void {
    this.selectedDifficulty = difficulty;
    this.storage.setSessionEntry('difficulty', this.selectedDifficulty);
  }
}
