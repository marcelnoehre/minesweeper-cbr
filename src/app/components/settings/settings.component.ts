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
  public languages:string[] = ['de', 'en', 'fr', 'es'];
  public selectedDifficulty:string = '';
  public difficulties: string[] = ['BEGINNER', 'ADVANCED', 'EXTREME'];
  public revealedCells: number = 25;
  public totalCells: number = 50;
  public flags: number = 10;
  public bombs: number = 10;


  constructor(
    private storage: StorageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.selectedLanguage = this.storage.getSessionEntry('lang');
    this.setDifficulty(this.storage.getSessionEntry('difficulty'));
  }

  setLanguage(lang:string): void {
    this.storage.setSessionEntry('lang', lang);
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  setDifficulty(difficulty:string): void {
    this.selectedDifficulty = difficulty;
    this.storage.setSessionEntry('difficulty', this.selectedDifficulty);
  }
}
