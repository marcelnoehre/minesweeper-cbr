import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from '../enum/difficulty';
import { Case } from '../interfaces/case';
import { PatternService } from './pattern.service';
import { StorageService } from './storage.service';
import { BoardService } from './board.service';
import { GameStatsService } from './gamestats.service';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TokensService {
    private _prodMode: boolean;
    private _difficultyChange$!: Observable<string>;
    private _remainingTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _totalTokens: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    private _hintStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _hintText: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _hintQueryRunning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _colorFirstHint: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _colorSecondHint: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _colorThirdHint: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _cellsPerRow!: number;
    private _remainingFlags!: number;
    private _revealedCells!: number;
    private _cellsRevealed!: string[][];
    private _cellsPlanned!: string[][];
    private _solutionCase!: Case; 
    private _remainingTokensValue!: number;
    private _hintStatusValue!: number
    private _activeHint!: boolean;
    private _activeColorArea!: boolean;
    private _noSolution!: boolean;

    constructor(
        private _http: HttpClient,
        private storage: StorageService,
        private _pattern: PatternService,
        private _board: BoardService,
        private _gameStats: GameStatsService,
        private _api: ApiService
        ) {
        this._prodMode = environment.production;
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
        this._gameStats.remainingFlags$.subscribe((remainingFlags) => {
            this._remainingFlags = remainingFlags;
        });
        this._gameStats.revealedCells$.subscribe((revealedCells) => {
            this._revealedCells = revealedCells;
        });
        this._board.cellsRevealed$.subscribe((cellsRevealed) => {
            this._cellsRevealed = cellsRevealed;
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

    setColorFirstHint(color:string) {
        this._colorFirstHint.next(color);
    }
    setColorSecondHint(color:string) {
        this._colorSecondHint.next(color);
    }
    setColorThirdHint(color:string) {
        this._colorThirdHint.next(color);
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
    
    get colorFirstHint$(): Observable<string> {
        return this._colorFirstHint.asObservable();
    }

    get colorSecondHint$(): Observable<string> {
        return this._colorSecondHint.asObservable();
    }

    get colorThirdHint$(): Observable<string> {
        return this._colorThirdHint.asObservable();
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
        this.setColorFirstHint('');
        this.setColorSecondHint('');
        this.setColorThirdHint('');
        this._board.resetColors(this._cellsPerRow);
    }

    async setupSolution() {
        this.setHintQueryRunning(true);
        let queryResult = await this._pattern.getSolution();
        if(Object.keys(queryResult).length == 0) {
            this.setNoSolution(true);
            this.setRemainingTokens(this._remainingTokensValue + this._hintStatusValue);
            this.setHintQueryRunning(false);
            this._http.get<any>(`assets/solutions/solution-keys.json`).subscribe((value: any) => {
                this.setHintText(value['NO.SOLUTION']);
            });
            this.setColorFirstHint('red');
            this.setColorSecondHint('red');
            this.setColorThirdHint('red');
        } else if(Object.keys(queryResult).length == 1) {
            this.setNoSolution(true);
            this.setRemainingTokens(this._remainingTokensValue + this._hintStatusValue);
            this.setHintQueryRunning(false);
            this._http.get<any>(`assets/solutions/solution-keys.json`).subscribe((value: any) => {
                this.setHintText(value['BACKEND.OFFLINE']);
            });
            this.setColorFirstHint('red');
            this.setColorSecondHint('red');
            this.setColorThirdHint('red');
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
            let hintText = '';
            let withoutDuplitcates: string[] = this._solutionCase.solutionTypes.filter(function(element, index, self) {
                return index == self.indexOf(element);
            });
            for(let i = 0; i < withoutDuplitcates.length; i++) {
                this._http.get<any>(`assets/solutions/solution-keys.json`).subscribe((value: any) => {
                    hintText += value[withoutDuplitcates[i]] + '\n\n';
                    this.setHintText(hintText);
                });
            }
            this.setHintQueryRunning(false);
        }
    }

    colorDevArea() {
        this._board.setCellsColored(this._solutionCase.fieldRow, this._solutionCase.fieldColumn, 'lime');
        for(let i = 0; i < this._solutionCase.solutionCells.length; i++) {
            let tmp = this._solutionCase.solutionCells[i];
            let row = this._solutionCase.fieldRow - 2 + Number(Array.from(tmp)[0]);
            let column = this._solutionCase.fieldColumn - 2 + Number(Array.from(tmp)[1]);
            this._board.setCellsColored(row, column, 'red');
        }
    }

    setupColoredArea() {
        if(!this.noSolution) {
            if(!this._prodMode) {
                this.colorDevArea();
            } else {
                console.log(this._solutionCase.fieldRow, this._solutionCase.fieldColumn);
                let random: number[] = this._pattern.patternOrder[Math.floor(Math.random() * (24 - 0 + 1) + 0)];
                let randomCenter: number[] = [this._solutionCase.fieldRow + random[0], this._solutionCase.fieldColumn + random[1]];
                for(let i = 0; i < 25; i++) {
                    this._board.setCellsColored(randomCenter[0] + this._pattern.patternOrder[i][0], randomCenter[1] + this._pattern.patternOrder[i][1], 'lime');
                }
            }
        }
    }

    turnCell() {
        if(!this.noSolution) {
            let validSolution: boolean = false;
            for(let i = 0; i < this._solutionCase.solutionCells.length; i++) {
                switch(this._solutionCase.solutionTypes[i]) {
                    case 'COVERED.AMOUNT': {
                        if(this.setFlagAutomatically()) {
                            validSolution = true;
                        }
                        break;
                    }
                    case 'MINES.FLAGGED': {
                        if(this.setPossibleFlagAutomatically()) {
                            validSolution = true;
                        }
                        break;
                    }
                    case 'COVERED.FLAGGED': {
                        if(this.setPossibleFlagAutomatically()) {
                            validSolution = true
                        }
                        break;
                    }
                    case 'WRONG.SURROUND': {
                        if(this.removeFlagAutomatically()) {
                            validSolution = true;
                        }
                        break;
                    }
                    case 'WRONG.FLAG': {
                        if(this.removeFlagAutomatically()) {
                            validSolution = true;
                        }
                        break;
                    }
                }
            }
            if(!validSolution) {
                this.setRemainingTokens(this._remainingTokensValue + this._hintStatusValue);
                this._http.get<any>(`assets/solutions/solution-keys.json`).subscribe((value: any) => {
                    this.setHintText(value['NO.SOLUTION']);
                });        
                this.setNoSolution(true);
                if(this._solutionCase.similarity == 1) {
                    if(Object.values(this._api.updateCaseCall(this._pattern.createCase(this._solutionCase.fieldRow, this._solutionCase.fieldColumn)))[0] == 'False') {
                        this._api.removeCaseCall(this._pattern.getPatternByIndex(this._solutionCase.fieldRow, this._solutionCase.fieldColumn));
                    }
                } else {
                    this._pattern.createCase(this._solutionCase.fieldRow, this._solutionCase.fieldColumn);
                }
            }
        }
    }





    colourSolutionArea(row: number, column: number) {
        if(!this._prodMode) {
            this.colorDevArea();
        } else {
            for(let i = 0; i < 25; i++) {
                if(i == 0) {
                    this._board.setCellsColored(row + this._pattern.patternOrder[i][0], column + this._pattern.patternOrder[i][1], 'darkorange');
                }
                else if(i > 8) {
                    this._board.setCellsColored(row + this._pattern.patternOrder[i][0], column + this._pattern.patternOrder[i][1], 'lime');
                }
                else {
                    this._board.setCellsColored(row + this._pattern.patternOrder[i][0], column + this._pattern.patternOrder[i][1], 'yellow');
                }
            }
        }
    }

    setFlagAutomatically() {
        if(this._cellsPlanned[this._solutionCase.fieldRow][this._solutionCase.fieldColumn] == 'M') {
            this._board.setCellsRevealed(this._solutionCase.fieldRow, this._solutionCase.fieldColumn, 'F');
            this._gameStats.setRemainingFlags(this._remainingFlags-1);
            this.colourSolutionArea(this._solutionCase.fieldRow, this._solutionCase.fieldColumn);
            return true;
        }
        else {
            return false;
        }
    }

    setPossibleFlagAutomatically() {
        if(this._cellsPlanned[this._solutionCase.fieldRow][this._solutionCase.fieldColumn] != 'M') {
            this._board.setCellsRevealed(this._solutionCase.fieldRow, this._solutionCase.fieldColumn, this._cellsPlanned[this._solutionCase.fieldRow][this._solutionCase.fieldColumn]);
            this._gameStats.setRevealedCells(this._revealedCells+1);
            this.colourSolutionArea(this._solutionCase.fieldRow, this._solutionCase.fieldColumn);
            return true;
        } else {
            for(let i = 1; i <= 8; i++) {
                if( this._cellsRevealed[this._solutionCase.fieldRow + this._pattern.patternOrder[i][0]][this._solutionCase.fieldColumn + this._pattern.patternOrder[i][1]] == 'F' &&
                    this._cellsPlanned[this._solutionCase.fieldRow + this._pattern.patternOrder[i][0]][this._solutionCase.fieldColumn + this._pattern.patternOrder[i][1]] != 'M') {
                    this._board.setCellsRevealed(this._solutionCase.fieldRow + this._pattern.patternOrder[i][0], this._solutionCase.fieldColumn + this._pattern.patternOrder[i][1], 'C');
                    this._gameStats.setRemainingFlags(this._remainingFlags+1); 
                    this.colourSolutionArea(this._solutionCase.fieldRow + this._pattern.patternOrder[i][0], this._solutionCase.fieldColumn + this._pattern.patternOrder[i][1]);
                    return true;
                }
            }
            return false;
        }
    }

    removeFlagAutomatically() {
        for(let i = 0; i <= 24; i++) {
            if(this._cellsRevealed[this._solutionCase.fieldRow + this._pattern.patternOrder[i][0]][this._solutionCase.fieldColumn + this._pattern.patternOrder[i][1]] == 'F' &&
                this._cellsPlanned[this._solutionCase.fieldRow + this._pattern.patternOrder[i][0]][this._solutionCase.fieldColumn + this._pattern.patternOrder[i][1]] != 'M') {
                this._board.setCellsRevealed(this._solutionCase.fieldRow + this._pattern.patternOrder[i][0], this._solutionCase.fieldColumn + this._pattern.patternOrder[i][1], 'C');
                this._gameStats.setRemainingFlags(this._remainingFlags+1); 
                this.colourSolutionArea(this._solutionCase.fieldRow + this._pattern.patternOrder[i][0], this._solutionCase.fieldColumn + this._pattern.patternOrder[i][1]);
                return true;
            }
        }
        return false;
    }
}