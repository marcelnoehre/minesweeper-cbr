import { Injectable } from '@angular/core';
import { UrlObject } from '../interfaces/url-object';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private urls: UrlObject = {
    'minesweeper-CBR-backend': 'http://localhost:8080/minesweeper-cbr-backend/',
  };
  constructor() { }

  getUrl(key: string) {
    return this.urls[key];
  }
}
