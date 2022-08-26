import { ComponentFactoryResolver, Injectable, ɵɵtextInterpolate } from '@angular/core';
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
    private patternOrder: number[][] = [
        [0,0],[-1,-1],[-1,0],[-1,1],[0,1],[-1,1],[0,1],[-1,1],[-1,0],
        [-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-1,2],[0,2],[1,2],[2,2],
        [2,1],[2,0],[2,-1],[2,-2],[1,-2],[0,-2],[-1,-2]
    ];

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
                    return Object.values(result)[0][i];
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

    getPatternByIndex(x: number, y: number): string {
        let pattern = '';
        for(let i = 0; i < 25; i++) {
            if(x + this.patternOrder[i][0] < 0 || 
                y + this.patternOrder[i][1] < 0 || 
                x + this.patternOrder[i][0] >= this.cellsPerRow || 
                y + this.patternOrder[i][1] >= this.cellsPerRow) {
                pattern += 'B';
            } else {
                pattern += this.cellsRevealed[x + this.patternOrder[i][0]][y + this.patternOrder[i][1]];
            }
        }
        return pattern;
    }
}
