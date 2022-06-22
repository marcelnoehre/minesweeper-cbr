import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from '../enum/difficulty';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class GameStatsService implements OnInit{
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

    constructor(
        private storage: StorageService
        ) {
    }

    ngOnInit() {
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
                this._gameRunning = new BehaviorSubject<boolean>(false);
                this._revealedCells = new BehaviorSubject<number>(0);
                this._totalCells = new BehaviorSubject<number>(100);
                this._cellsPerRow = new BehaviorSubject<number>(10);
                this._flagAmount = new BehaviorSubject<number>(10);
                this._remainingFlags = new BehaviorSubject<number>(10);
                this._bombAmount = new BehaviorSubject<number>(10);
                this._flaggedBombs = new BehaviorSubject<number>(0);
                this._isFlagMode = new BehaviorSubject<boolean>(false);
                break;
            case DifficultyEnum.advanced:
                this._gameRunning = new BehaviorSubject<boolean>(false);
                this._revealedCells = new BehaviorSubject<number>(0);
                this._totalCells = new BehaviorSubject<number>(225);
                this._cellsPerRow = new BehaviorSubject<number>(15);
                this._flagAmount = new BehaviorSubject<number>(15);
                this._remainingFlags = new BehaviorSubject<number>(20);
                this._bombAmount = new BehaviorSubject<number>(20);
                this._flaggedBombs = new BehaviorSubject<number>(0);
                this._isFlagMode = new BehaviorSubject<boolean>(false);
                break;
            case DifficultyEnum.expert:
                this._gameRunning = new BehaviorSubject<boolean>(false);
                this._revealedCells = new BehaviorSubject<number>(0);
                this._totalCells = new BehaviorSubject<number>(400);
                this._cellsPerRow = new BehaviorSubject<number>(20);
                this._flagAmount = new BehaviorSubject<number>(20);
                this._remainingFlags = new BehaviorSubject<number>(30);
                this._bombAmount = new BehaviorSubject<number>(30);
                this._flaggedBombs = new BehaviorSubject<number>(0);
                this._isFlagMode = new BehaviorSubject<boolean>(false);
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
