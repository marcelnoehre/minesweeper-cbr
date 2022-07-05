import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from '../enum/difficulty';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class TokensService {
    private _difficultyChange$!: Observable<string>;
    private _remainingTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _totalTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _hintStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private storage: StorageService) {
        this._difficultyChange$ = this.storage.storageChange$.pipe(
            filter(({ key }) => key === "difficulty"),
            pluck("id")
        );
            this._difficultyChange$.subscribe(newDifficulty => {
            this.setup(newDifficulty);
        });
        this.setup(this.storage.getSessionEntry('difficulty'));
    }

    setup(difficulty: string) {
        switch (difficulty) {
            case DifficultyEnum.beginner:
                this.setRemainingTokens(10);
                this.setTotalTokens(10);
                this.setHintStatus(0);
                break;
            case DifficultyEnum.advanced:
                this.setRemainingTokens(20);
                this.setTotalTokens(20);
                this.setHintStatus(0);
                break;
            case DifficultyEnum.extreme:
                this.setRemainingTokens(30);
                this.setTotalTokens(30);
                this.setHintStatus(0);
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