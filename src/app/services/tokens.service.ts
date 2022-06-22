import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from '../enum/difficulty';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class TokensService implements OnInit {
    private DifficultyChange$!: Observable<string>;
    private _remainingTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _totalTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _hintStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private storage: StorageService) {

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
                this._remainingTokens = new BehaviorSubject<number>(10);
                this._totalTokens = new BehaviorSubject<number>(10);
                this._hintStatus = new BehaviorSubject<number>(0);
                break;
            case DifficultyEnum.advanced:
                this._remainingTokens = new BehaviorSubject<number>(20);
                this._totalTokens = new BehaviorSubject<number>(20);
                this._hintStatus = new BehaviorSubject<number>(0);
                break;
            case DifficultyEnum.expert:
                this._remainingTokens = new BehaviorSubject<number>(30);
                this._totalTokens = new BehaviorSubject<number>(30);
                this._hintStatus = new BehaviorSubject<number>(0);
                break;
            default:
                break;
        }
    }

    setTotalTokens(totalTokens: number) {
        this._totalTokens.next(totalTokens);
    }

    setRemainingTokens(remainingTokens: number) {
        this._remainingTokens.next(remainingTokens);
    }

    setHintStatus(hintStatus: number) {
        this._hintStatus.next(hintStatus);
    }

    get totalTokens$(): Observable<number> {
        return this._totalTokens.asObservable();
    }

    get remainingTokens$(): Observable<number> {
        return this._remainingTokens.asObservable();
    }

    get hintStatus$(): Observable<number> {
        return this._hintStatus.asObservable();
    }
}