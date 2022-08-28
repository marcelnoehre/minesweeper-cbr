import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from '../enum/difficulty';
import { Case } from '../interfaces/case';
import { PatternService } from './pattern.service';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class TokensService {
    private _difficultyChange$!: Observable<string>;
    private _remainingTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _totalTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _hintStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _hintText: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _activeHint!: boolean;
    private _solutionCase!: Case;
    private _http!: HttpClient;

    constructor(
        private storage: StorageService,
        private _pattern: PatternService
        ) {
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
            case DifficultyEnum.expert:
                this.setRemainingTokens(30);
                this.setTotalTokens(30);
                this.setHintStatus(0);
                break;
            default:
                break;
        }
        this.setActiveHint(false);
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

    setHintText(hintText: string) {
        this._hintText.next(hintText);
    }

    setActiveHint(active: boolean) {
        this._activeHint = active;
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

    get hintText$(): Observable<string> {
        return this._hintText.asObservable();
    }

    get activeHint(): boolean {
        return this._activeHint;
    }

    resetHintStatus() {
        this.setActiveHint(false);
        this.setHintText('');
        this.setHintStatus(0);
    }

    async setupSolution() {
        let queryResult = await this._pattern.getSolution();
        if(Object.keys(queryResult).length == 0) {
            this.setHintText('Für die aktuell vorliegende Situation kann kein zielführender Tipp gegeben werden. Die genutzten Diamanten werden zurückgezahlt.');
        } else {
            //TODO: handle solution object to display hint
            let solutionKey = 'MINES.REVEALED';
            const url = `assets/solutions/${solutionKey}.json`;
            // this._http.get<string>(url).subscribe((hintText: string) => {
            //     this.setHintText(hintText);
            // });
            console.dir(Object.keys(queryResult));           
        }
    }
}