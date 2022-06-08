import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChild('input') difficulty!: ElementRef;
  public loading: boolean = false;
  public selectedLanguage:string = '';
  public languages:string[] = ['de', 'en', 'fr', 'es'];
  public difficulties: string[] = ['BEGINNER', 'ADVANCED', 'EXTREME'];
  public minutes: string = '00';
  public seconds: string = '00';
  public time: number = 0;
  public gameTime: number = 0;
  private interval: any;

  constructor(
    private storage: StorageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.selectedLanguage = this.storage.getSessionEntry('lang');
    this.setDifficulty(this.storage.getSessionEntry('difficulty'));
  }

  ngAfterViewInit(): void {
      this.loading = false;
  }

  setLanguage(lang:string): void {
    this.storage.setSessionEntry('lang', lang);
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  setDifficulty(difficulty:string): void {
    this.storage.setSessionEntry('difficulty', difficulty);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time++;
      let minutes = Math.floor(this.time / 60);
      let seconds = this.time % 60;
      this.minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      this.seconds = seconds < 10 ? '0' + seconds : '' + seconds; 
    },1000)
  }

  stopTimer() {
    this.gameTime = this.time
    this.time = 0;
    clearInterval(this.interval);
  }
}
