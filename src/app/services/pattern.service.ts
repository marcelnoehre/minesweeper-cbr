import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PatternService {

    getCheckablePattern(revealedBoard: String[][]):void {
        for(let i = 0; i < revealedBoard.length; i++) {
            for(let j = 0; j < revealedBoard[i].length; j++) {
                if(revealedBoard[i][j] == 'C' || revealedBoard[i][j] == 'F') {
                    console.log('Value: ', i,j, ' ', revealedBoard[i][j]);
                }
            }
        }
    }
}
