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
    private _remainingTokensValue!: number;
    private _hintStatusValue!: number
    private _activeHint!: boolean;
    private _activeColorArea!: boolean;
    private _noSolution!: boolean;
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
        this.remainingTokens$.subscribe((remainingTokens: number) => {
            this._remainingTokensValue = remainingTokens;
        });
        this.hintStatus$.subscribe((hintStatus: number) => {
            this._hintStatusValue = hintStatus;
        });
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
        this.setActiveColorArea(false);
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

    setActiveColorArea(active: boolean) {
        this._activeColorArea = active;
    }

    setNoSolution(active: boolean) {
        this._noSolution = active;
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

    get activeColorArea(): boolean {
        return this._activeColorArea;
    }

    get noSolution(): boolean {
        return this._noSolution;
    }

    resetHintStatus() {
        this.setActiveHint(false);
        this.setActiveColorArea(false);
        this.setNoSolution(false);
        this.setHintText('');
        this.setHintStatus(0);
    }

    async setupSolution() {
        let queryResult = await this._pattern.getSolution();
        if(Object.keys(queryResult).length == 0) {
            this.setNoSolution(true);
            this.setRemainingTokens(this._remainingTokensValue + this._hintStatusValue);
            this.setHintText('Für die aktuell vorliegende Situation kann kein zielführender Tipp gegeben werden. Die genutzten Diamanten werden zurückgezahlt.');
        } else {
            console.dir(Object.values(queryResult));
            let solutionCells: string[] = Object.values(queryResult)[26];
            let solutionTypes: string[] = Object.values(queryResult)[27];
            let hintText = '';
            
            for(let i = 0; i < solutionCells.length; i++) {
                // this._http.get<string>(`assets/solutions/${solutionTypes[i]}.json`).subscribe((value: string) => {
                //     hintText += value + '\n';
                // });
                hintText += solutionTypes[i] + '\n';
                console.log(solutionCells[i], solutionTypes[i]);
            }
            this.setHintText(hintText);
        }
    }

    setupColoredArea() {
        console.log('color area');
    }

    turnCell() {
        console.log('turn cell');
    }
}