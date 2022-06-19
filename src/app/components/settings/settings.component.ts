import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameStats } from 'src/app/interfaces/game-stats';
import { StorageService } from 'src/app/services/storage.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnChanges {
  @Input() gameStats!: GameStats;
  @Output() restart = new EventEmitter;
  @Output() dialog = new EventEmitter;
  @Output() handbook = new EventEmitter;
  public loading: boolean = false;
  public selectedLanguage:string = '';
  public languages:string[] = ['de', 'en', 'fr', 'es'];
  public selectedDifficulty:string = '';
  public difficulties: string[] = ['BEGINNER', 'ADVANCED', 'EXTREME'];
  public timerRunning: boolean = false;
  public minutes: string = '00';
  public seconds: string = '00';
  public time: number = 0;
  private interval: any;

  constructor(
    private storage: StorageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.selectedLanguage = this.storage.getSessionEntry('lang');
    this.selectedDifficulty = this.storage.getSessionEntry('difficulty');
    this.setDifficulty(this.storage.getSessionEntry('difficulty'));
  }

  ngOnChanges() {
    if(this.time === 0 && this.gameStats.gameRunning == true && !this.timerRunning) {
      this.startTimer();
    }
    if(this.selectedDifficulty != this.gameStats.difficulty) {
      this.stopTimer();
    }
    if(this.gameStats.revealedCells === this.gameStats.totalCells - this.gameStats.bombAmount) {
      //TODO: Show winner dialog
      this.dialog.emit([]);
    }
  }

  setLanguage(lang:string): void {
    this.storage.setSessionEntry('lang', lang);
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  setDifficulty(difficulty:string): void {
    this.storage.setSessionEntry('difficulty', difficulty);
  }

  restartGame() {
    this.stopTimer();
    this.restart.emit(true);
  }

  startTimer() {
    this.timerRunning = true;
    this.interval = setInterval(() => {
      this.time++;
      let minutes = Math.floor(this.time / 60);
      let seconds = this.time % 60;
      this.minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      this.seconds = seconds < 10 ? '0' + seconds : '' + seconds; 
    },1000)
  }

  stopTimer() {
    this.timerRunning = false;
    this.time = 0;
    this.minutes = '00';
    this.seconds = '00';
    clearInterval(this.interval);
  }

  openHandbook() {
    this.handbook.emit(true);
  }
}
