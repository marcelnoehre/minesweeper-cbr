import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from '../enum/difficulty';
import { Case } from '../interfaces/case';
import { PatternService } from './pattern.service';
import { StorageService } from './storage.service';
import { BoardService } from './board.service';
import { GameStatsService } from './gamestats.service';

@Injectable({
	providedIn: 'root'
})
export class TokensService {
    private _difficultyChange$!: Observable<string>;
    private _remainingTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _totalTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _hintStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _hintText: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _hintQueryRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _cellsPerRow!: number;
    private _cellsPlanned!: string[][];
    private _solutionCase!: Case; 
    private _remainingTokensValue!: number;
    private _hintStatusValue!: number
    private _activeHint!: boolean;
    private _activeColorArea!: boolean;
    private _noSolution!: boolean;
    private _http!: HttpClient;

    constructor(
        private storage: StorageService,
        private _pattern: PatternService,
        private _board: BoardService,
        private _gameStats: GameStatsService
        ) {
        this._difficultyChange$ = this.storage.storageChange$.pipe(
            filter(({ key }) => key === "difficulty"),
            pluck("id")
        );
            this._difficultyChange$.subscribe(newDifficulty => {
            this.setup(newDifficulty);
        });
        this.setup(this.storage.getSessionEntry('difficulty'));
        this._gameStats.cellsPerRow$.subscribe((cellsPerRow) => {
            this._cellsPerRow = cellsPerRow;
        });
        this._board.cellsPlanned$.subscribe((cellsPlanned: string[][]) => {
            this._cellsPlanned = cellsPlanned;
        });
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

    setHintQueryRunning(hintQueryRunning: boolean) {
        this._hintQueryRunning.next(hintQueryRunning);
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

    get hintQueryRunning$(): Observable<boolean> {
        return this._hintQueryRunning.asObservable();
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
        this.setHintQueryRunning(false);
        this.setActiveHint(false);
        this.setActiveColorArea(false);
        this.setNoSolution(false);
        this.setHintText('');
        this.setHintStatus(0);
        this._board.resetColors(this._cellsPerRow);
    }

    async setupSolution() {
        this.setHintQueryRunning(true);
        let queryResult = await this._pattern.getSolution();
        if(Object.keys(queryResult).length == 0) {
            this.setNoSolution(true);
            this.setRemainingTokens(this._remainingTokensValue + this._hintStatusValue);
            this.setHintQueryRunning(false);
            this.setHintText('Für die aktuell vorliegende Situation kann kein zielführender Tipp gegeben werden. Die genutzten Diamanten werden zurückgezahlt.');
        } else {
            this._solutionCase = {
                center: Object.values(queryResult)[0],
                innerTopLeft: Object.values(queryResult)[1],
                innerTop: Object.values(queryResult)[2],
                innerTopRight: Object.values(queryResult)[3],
                innerRight: Object.values(queryResult)[4],
                innerBottomRight: Object.values(queryResult)[5],
                innerBottom: Object.values(queryResult)[6],
                innerBottomLeft: Object.values(queryResult)[7],
                innerLeft: Object.values(queryResult)[8],
                outerTopLeftCorner: Object.values(queryResult)[9],
                outerTopLeft: Object.values(queryResult)[10],
                outerTop: Object.values(queryResult)[11],
                outerTopRight: Object.values(queryResult)[12],
                outerTopRightCorner: Object.values(queryResult)[13],
                outerRightTop: Object.values(queryResult)[14],
                outerRight: Object.values(queryResult)[15],
                outerRightBottom: Object.values(queryResult)[16],
                outerBottomRightCorner: Object.values(queryResult)[17],
                outerBottomRight: Object.values(queryResult)[18],
                outerBottom: Object.values(queryResult)[19],
                outerBottomLeft: Object.values(queryResult)[20],
                outerBottomLeftCorner: Object.values(queryResult)[21],
                OuterLeftBottom: Object.values(queryResult)[22],
                outerLeft: Object.values(queryResult)[23],
                outerLeftTop: Object.values(queryResult)[24],
                solvability: Object.values(queryResult)[25] == "True",
                solutionCells: Object.values(queryResult)[26],
                solutionTypes: Object.values(queryResult)[27],
                similarity: Object.values(queryResult)[28],
                fieldRow: Object.values(queryResult)[29],
                fieldColumn: Object.values(queryResult)[30]
            }
            console.dir(this._solutionCase);
            let hintText = '';
            for(let i = 0; i < this._solutionCase.solutionCells.length; i++) {
                // this._http.get<string>(`assets/solutions/${solutionTypes[i]}.json`).subscribe((value: string) => {
                //     hintText += value + '\n';
                // });
                hintText += this._solutionCase.solutionTypes[i] + '\n';
            }
            this.setHintQueryRunning(false);
            this.setHintText(hintText);
        }
    }

    setupColoredArea() {
        if(!this.noSolution) {
            this._board.setCellsColored(this._solutionCase.fieldRow, this._solutionCase.fieldColumn, 'lightgreen');
            for(let i = 0; i < this._solutionCase.solutionCells.length; i++) {
                let tmp = this._solutionCase.solutionCells[i];
                let row = this._solutionCase.fieldRow - 2 + Number(Array.from(tmp)[0]);
                let column = this._solutionCase.fieldColumn - 2 + Number(Array.from(tmp)[1]);
                this._board.setCellsColored(row, column, 'red')
            }
        }
    }

    turnCell() {
        if(!this.noSolution) {
            let validSolution = false;
            for(let i = 0; i < this._solutionCase.solutionTypes.length; i++) {
                switch(this._solutionCase.solutionTypes[i]) {
                    case 'COVERED.AMOUNT': {
                        //check if valid
                        //end loop if valid
                        break;
                    }
                    case 'MINES.FLAGGED': {
                        //check if valid
                        //end loop if valid
                        break;
                    } 
                    case 'MINES.REVEALED': {
                        //check if valid
                        //end loop if valid
                        break;
                    }
                    case 'SUSPICIOUS.FLAG': {
                        //check if valid
                        //end loop if valid
                        break;
                    }
                    case 'WRONG.FLAG': {
                        //check if valid
                        //end loop if valid
                        break;
                    }
                }
            }
            if(validSolution) {
                //show solution
            } else {
                //if similarity == 1 -> delete
                //if similarity != 1 -> create new case
            }
        }
    }
}