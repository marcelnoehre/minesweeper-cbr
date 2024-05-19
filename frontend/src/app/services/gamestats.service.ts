import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from '../enum/difficulty';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class GameStatsService {
    private _difficultyChange$!: Observable<string>;
    private _gameRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _revealedCells: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _totalCells: BehaviorSubject<number> = new BehaviorSubject<number>(100);
    private _cellsPerRow: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _flagAmount: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _remainingFlags: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _mineAmount: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _flaggedmines: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _isFlagMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _isFlagPermanently: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private _storage: StorageService) {
            this._difficultyChange$ = this._storage.storageChange$.pipe(
                filter(({ key }) => key === "difficulty"),
                pluck("id")
            );
                this._difficultyChange$.subscribe(newDifficulty => {
                this.setup(newDifficulty);
            });
            this.setup(this._storage.getSessionEntry('difficulty'));
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
                this.setmineAmount(10);
                this.setFlaggedmines(0);
                this.setIsFlagMode(false);
                this.setisFlagPermanently(false);
                break;
            case DifficultyEnum.advanced:
                this.setGameRunning(false);
                this.setRevealedCells(0);
                this.setTotalCells(225);
                this.setCellsPerRow(15);
                this.setFlagAmount(20);
                this.setRemainingFlags(20);
                this.setmineAmount(20);
                this.setFlaggedmines(0);
                this.setIsFlagMode(false);
                this.setisFlagPermanently(false);
                break;
            case DifficultyEnum.expert:
                this.setGameRunning(false);
                this.setRevealedCells(0);
                this.setTotalCells(400);
                this.setCellsPerRow(20);
                this.setFlagAmount(30);
                this.setRemainingFlags(30);
                this.setmineAmount(30);
                this.setFlaggedmines(0);
                this.setIsFlagMode(false);
                this.setisFlagPermanently(false);
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

    setmineAmount(mineAmount: number) {
        this._mineAmount.next(mineAmount);
    }

    setFlaggedmines(flaggedmines: number) {
        this._flaggedmines.next(flaggedmines);
    }

    setIsFlagMode(isFlagMode: boolean) {
        this._isFlagMode.next(isFlagMode);
    }

    setisFlagPermanently(isFlagPermanently: boolean) {
        this._isFlagPermanently.next(isFlagPermanently);
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
    
    get mineAmount$() {
        return this._mineAmount.asObservable();
    }
    
    get flaggedmines$() {
        return this._flaggedmines.asObservable();
    }
    
    get isFlagMode$() {
        return this._isFlagMode.asObservable();
    }

    get isFlagPermanently$() {
        return this._isFlagPermanently.asObservable();
    }
}
