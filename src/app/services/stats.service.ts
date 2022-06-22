import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from '../enum/difficulty';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class GameStatsService {
    private DifficultyChange$!: Observable<string>;
    private _gameRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _revealedCells: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _totalCells: BehaviorSubject<number> = new BehaviorSubject<number>(100);
    private _cellsPerRow: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _flagAmount: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _remainingFlags: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _bombAmount: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _flaggedBombs: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _isFlagMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private storage: StorageService) {
            this.DifficultyChange$ = this.storage.storageChange$.pipe(
                filter(({ key }) => key === "difficulty"),
                pluck("id")
            );
                this.DifficultyChange$.subscribe(newDifficulty => {
                this.setup(newDifficulty);
            });
            this.setup(this.storage.getSessionEntry('difficulty'));
    }

    setup(difficulty: string) {
        switch (difficulty) {
            case DifficultyEnum.beginner:
                this.setGameRunning(false);
                this.setRevealedCells(0);
                this.setTotalCells(100);
                this.setCellsPerRow(10);
                this.setFlagAmount(10);
                this.setRemainingFlags(10);
                this.setBombAmount(10);
                this.setFlaggedBombs(0);
                this.setIsFlagMode(false);
                break;
            case DifficultyEnum.advanced:
                this.setGameRunning(false);
                this.setRevealedCells(0);
                this.setTotalCells(225);
                this.setCellsPerRow(15);
                this.setFlagAmount(20);
                this.setRemainingFlags(20);
                this.setBombAmount(20);
                this.setFlaggedBombs(0);
                this.setIsFlagMode(false);
                break;
            case DifficultyEnum.extreme:
                this.setGameRunning(false);
                this.setRevealedCells(0);
                this.setTotalCells(400);
                this.setCellsPerRow(20);
                this.setFlagAmount(30);
                this.setRemainingFlags(30);
                this.setBombAmount(30);
                this.setFlaggedBombs(0);
                this.setIsFlagMode(false);
                break;
            default:
                break;
        }
    }

    setGameRunning(gameRunning: boolean) {
        this._gameRunning.next(gameRunning);
    }

    setRevealedCells(revealedCells: number) {
        this._revealedCells.next(revealedCells);
    }

    setTotalCells(totalCells: number) {
        this._totalCells.next(totalCells);
    }

    setCellsPerRow(cellsPerRow: number) {
        this._cellsPerRow.next(cellsPerRow);
    }

    setFlagAmount(flagAmount: number) {
        this._flagAmount.next(flagAmount);
    }

    setRemainingFlags(remainingFlags: number) {
        this._remainingFlags.next(remainingFlags);
    }

    setBombAmount(bombAmount: number) {
        this._bombAmount.next(bombAmount);
    }

    setFlaggedBombs(flaggedBombs: number) {
        this._flaggedBombs.next(flaggedBombs);
    }

    setIsFlagMode(isFlagMode: boolean) {
        this._isFlagMode.next(isFlagMode);
    }

    get gameRunning$() {
        return this._gameRunning.asObservable();
    }

    get revealedCells$() {
        return this._revealedCells.asObservable();
    }
    
    get totalCells$() {
        return this._totalCells.asObservable();
    }
    
    get cellsPerRow$() {
        return this._cellsPerRow.asObservable();
    }
    
    get flagAmount$() {
        return this._flagAmount.asObservable();
    }
    
    get remainingFlags$() {
        return this._remainingFlags.asObservable();
    }
    
    get bombAmount$() {
        return this._bombAmount.asObservable();
    }
    
    get flaggedBombs$() {
        return this._flaggedBombs.asObservable();
    }
    
    get isFlagMode$() {
        return this._isFlagMode.asObservable();
    }
}
