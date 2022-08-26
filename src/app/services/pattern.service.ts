import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PatternService {
    private predictableIndexes: number[][] = [];

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
}
