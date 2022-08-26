import { Injectable } from '@angular/core';
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
        private _gameStats: GameStatsService
        ) {
        _board.cellsRevealed$.subscribe((cellRevealed: string[][]) => {
            this.cellsRevealed = cellRevealed;
        });
        _gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
            this.cellsPerRow = cellsPerRow;
        });
    }

    getCheckablePattern(revealedBoard: string[][]):void {
        for(let i = 0; i < revealedBoard.length; i++) {
            for(let j = 0; j < revealedBoard[i].length; j++) {
                if(revealedBoard[i][j] == 'C' || revealedBoard[i][j] == 'F') {
                    this.predictableIndexes.push([i,j]);
                }
            }
        }
        console.log(this.predictableIndexes);
    }

    getPatternByIndex(x: number, y: number) {
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
    }
}
