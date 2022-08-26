import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PatternService {

    getCheckablePattern(revealedBoard: String[][]):void {
        for(let field of revealedBoard) {
            console.log(field);
        }
    }
}
