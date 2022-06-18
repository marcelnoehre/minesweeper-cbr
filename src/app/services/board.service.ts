import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class BoardService {

    facingDown(counter: number): string[][] {
        let array: string[][] = [];
        for (let i = 0; i < counter; i++) {
            let innerArray: string[] = [];
            for(let j = 0; j < counter; j++) {
                innerArray.push('facingDown');
            }
            array.push(innerArray); 
        }
        return array;
    }

    planned(counter: number, row: number, column: number): string[][] {
        let array: string[][] = [];
        for (let i = 0; i < counter; i++) {
            let innerArray: string[] = [];
            for(let j = 0; j < counter; j++) {
                innerArray.push('1');
            }
            array.push(innerArray); 
        }
        return array;
    }
}