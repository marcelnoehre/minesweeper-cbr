import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TimerService {

    private _gameTime: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _gameTimeValue: number = 0;
    private _interval: any;

    constructor() {
        this._gameTime.subscribe((gameTime) => {
            this._gameTimeValue = gameTime;
        });
    }

    setGameTime(gameTime: number) {
        this._gameTimeValue = gameTime;
        this._gameTime.next(gameTime);
    }

    get gameTime$() {
        return this._gameTime.asObservable();
    }

    start() {
        this.setGameTime(0);
        this._interval = setInterval(() => {
            this.setGameTime(this._gameTimeValue+1);
        },1000)
    }

    stop() {
        clearInterval(this._interval);
    }

    reset() {
        this.setGameTime(0);
    }
}