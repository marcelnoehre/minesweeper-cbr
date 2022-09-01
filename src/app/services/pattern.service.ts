import { Injectable } from '@angular/core';
import { Case } from '../interfaces/case';
import { Solution } from '../interfaces/solution';
import { ApiService } from './api.service';
import { BoardService } from './board.service';
import { GameStatsService } from './gamestats.service';

@Injectable({
	providedIn: 'root'
})
export class PatternService {
    private predictableIndexes: number[][] = [];
    private cellsRevealed!: string[][];
    private cellsPerRow!: number;
    private _patternOrder: number[][] = [
        [0,0],[-1,-1],[-1, 0],[-1, 1],[0,1],[1,1],[1,0],[1,-1],[0,-1],
        [-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-1,2],[0,2],[1,2],
        [2,2],[2,1],[2,0],[2,-1],[2,-2],[1,-2],[0,-2],[-1,-2]
    ];
    private caseCollection: Solution[] = [];

    constructor(
        private _board: BoardService,
        private _gameStats: GameStatsService,
        private _apiService: ApiService
        ) {
        _board.cellsRevealed$.subscribe((cellsRevealed: string[][]) => {
            this.cellsRevealed = cellsRevealed;
        });
        _gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
            this.cellsPerRow = cellsPerRow;
        });
    }

    get getCaseCollection() {
        return this.caseCollection;
    }

    get patternOrder() {
        return this._patternOrder;
    }

    resetCaseCollection() {
        this.caseCollection = [];
    }

    async getSolution(): Promise<Object> {
        this.getCheckablePattern();
        let result: Object = {};
        let solutionFound: boolean = false;
        let possibleIndexes: number[][] = this.predictableIndexes;
        let solution: Object = {};
        while(!solutionFound) {
            let newIndex: boolean = false;
            let index = -1;
            while(!newIndex) {
                index = Math.floor(Math.random()*possibleIndexes.length);
                if(this.predictableIndexes.includes(possibleIndexes[index])) {
                    newIndex = true;
                }
            }
            result = await this._apiService.getSolutionCall(this.getPatternByIndex(this.predictableIndexes[index][0], this.predictableIndexes[index][1]));
            for(let i = 0; Object.values(result)[0][i] != undefined; i++) {
                if(Object.values(result)[0][i].Solvability == 'True') {
                    solutionFound = true
                    let solutionCase: Case = {
                        center: Object.values(result)[0][i].Center,
                        innerTopLeft: Object.values(result)[0][i].InnerTopLeft,
                        innerTop: Object.values(result)[0][i].InnerTop,
                        innerTopRight: Object.values(result)[0][i].InnerTopRight,
                        innerRight: Object.values(result)[0][i].InnerRight,
                        innerBottomRight: Object.values(result)[0][i].InnerBottomRight,
                        innerBottom: Object.values(result)[0][i].InnerBottom,
                        innerBottomLeft: Object.values(result)[0][i].InnerBottomLeft,
                        innerLeft: Object.values(result)[0][i].InnerLeft,
                        outerTopLeftCorner: Object.values(result)[0][i].OuterTopLeft,
                        outerTopLeft: Object.values(result)[0][i].OuterTopLeft,
                        outerTop: Object.values(result)[0][i].OuterTop,
                        outerTopRight: Object.values(result)[0][i].OuterTopRight,
                        outerTopRightCorner: Object.values(result)[0][i].OuterTopRightCorner,
                        outerRightTop: Object.values(result)[0][i].OuterRightTop,
                        outerRight: Object.values(result)[0][i].OuterRight,
                        outerRightBottom: Object.values(result)[0][i].OuterRightBottom,
                        outerBottomRightCorner: Object.values(result)[0][i].OuterBottomRightCorner,
                        outerBottomRight: Object.values(result)[0][i].OuterBottomRight,
                        outerBottom: Object.values(result)[0][i].OuterBottom,
                        outerBottomLeft: Object.values(result)[0][i].OuterBottomLeft,
                        outerBottomLeftCorner: Object.values(result)[0][i].OuterBottomLeftCorner,
                        OuterLeftBottom: Object.values(result)[0][i].OuterLeftBottom,
                        outerLeft: Object.values(result)[0][i].OuterLeft,
                        outerLeftTop: Object.values(result)[0][i].OuterLeftTop,
                        solvability: Object.values(result)[0][i].Solvability == "True",
                        solutionCells: Object.values(result)[0][i].SolutionCells,
                        solutionTypes: Object.values(result)[0][i].SolutionTypes,
                        similarity: Object.values(result)[0][i].Similarity,
                        fieldRow: this.predictableIndexes[index][0],
                        fieldColumn: this.predictableIndexes[index][1]
                    }
                    return solutionCase;
                }
            }
            if(!solutionFound) {
                possibleIndexes.splice(index,1);
                if(possibleIndexes.length == 0) {
                    solutionFound = true;
                }
            }
        }
        return solution;
    }

    getCheckablePattern():void {
        for(let i = 0; i < this.cellsRevealed.length; i++) {
            for(let j = 0; j < this.cellsRevealed[i].length; j++) {
                if(this.cellsRevealed[i][j] == 'C' || this.cellsRevealed[i][j] == 'F') {
                    this.predictableIndexes.push([i,j]);
                }
            }
        }
    }

    getPatternByIndex(row: number, column: number): string {
        let pattern = '';
        for(let i = 0; i < 25; i++) {
            if(row + this.patternOrder[i][0] < 0 || 
                column + this.patternOrder[i][1] < 0 || 
                row + this.patternOrder[i][0] >= this.cellsPerRow || 
                column + this.patternOrder[i][1] >= this.cellsPerRow) {
                pattern += 'B';
            } else {
                pattern += this.cellsRevealed[row + this.patternOrder[i][0]][column + this.patternOrder[i][1]];
            }
        }
        return pattern;
    }

    createCase(row: number, column: number): Solution {
        let pattern = this.getPatternByIndex(row, column);
        let center = this.cellsRevealed[row][column];
        let solutionCells = '';
        let solutionTypes = '';
        for(let i = 1; i <= 8; i++) {
            let solutionKey = this.checkSolutionKey(center, row + this.patternOrder[i][0], column + this.patternOrder[i][1]);
            if(solutionKey != '') {
                let xSolution = 2 + this.patternOrder[i][0];
                let ySolution = 2 + this.patternOrder[i][1];
                solutionCells += xSolution + '' + ySolution + '%23';
                solutionTypes += solutionKey;
            }
        }
        const caseObject: Solution = {
            pattern: pattern, 
            solvability: solutionCells.length > 0 ? "True" : "False", 
            solutionCells: solutionCells.slice(0, -3),
            solutionTypes: solutionTypes.slice(0, -3)
        };
        this.caseCollection.push(caseObject);
        return caseObject;
    }

    checkSolutionKey(center: string, row: number, column: number) {
        let value = '';
        if(row < 0 || 
            column < 0 || 
            row >= this.cellsPerRow || 
            column  >= this.cellsPerRow) {
            value = 'B';
        } else {
            value = this.cellsRevealed[row][column];
        }
        let valueNumber = Number(value);
        if(valueNumber != NaN) {
            if(center == 'C') {
                return this.checkCoveredCenter(valueNumber, row, column);
            } else if(center == 'F') {
                return this.checkFlagCenter(valueNumber, row, column);
            }
            return '';
        }
        return '';
    }

    checkCoveredCenter(value: number, row: number, column: number) {
        let flagCounter = 0;
        let coveredCounter = 0;
        for(let i = 1; i <= 8; i++) {
            let surroundValue = '';
            if(row + this.patternOrder[i][0] < 0 || 
                column + this.patternOrder[i][1] < 0 || 
                row + this.patternOrder[i][0] >= this.cellsPerRow || 
                column + this.patternOrder[i][1] >= this.cellsPerRow) {
                surroundValue = 'B';
            } else {
                surroundValue = this.cellsRevealed[row + this.patternOrder[i][0]][column + this.patternOrder[i][1]];
            }
            switch(surroundValue) {
                case 'F': {
                    flagCounter++;
                    break;
                }
                case 'C': {
                    coveredCounter++;
                    break;
                }
            }
        }
        if(coveredCounter == value && flagCounter == 0) {
            return 'COVERED.AMOUNT%23';
        } else if(coveredCounter + flagCounter == value) {
            return 'COVERED.FLAGGED%23';
        } else if(flagCounter == value) {
            return 'MINES.FLAGGED%23';
        } else if(flagCounter > value) {
            return 'WRONG.SURROUND%23';
        }
        return '';
    }

    checkFlagCenter(value: number, row: number, column: number) {
        let flagCounter = 0;
        for(let i = 1; i <= 8; i++) {
            let surroundValue = '';
            if(row + this.patternOrder[i][0] < 0 || 
                column + this.patternOrder[i][1] < 0 || 
                row + this.patternOrder[i][0] >= this.cellsPerRow || 
                column + this.patternOrder[i][1] >= this.cellsPerRow) {
                surroundValue = 'B';
            } else {
                surroundValue = this.cellsRevealed[row + this.patternOrder[i][0]][column + this.patternOrder[i][1]];
            }
            switch(surroundValue) {
                case 'F': {
                    flagCounter++;
                    break;
                }
            }
            if(flagCounter > value) {
                return 'WRONG.FLAG%23';
            }
        }
        return '';
    }
}