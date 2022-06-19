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

    planned(counter: number, row: number, column: number, totalBombs: number): string[][] {
        let array: string[][] = [];
        for (let i = 0; i < counter; i++) {
            let innerArray: string[] = [];
            for(let j = 0; j < counter; j++) {
                innerArray.push('0');
            }
            array.push(innerArray); 
        }
        let placedBombs = 0;
        while(placedBombs != totalBombs) {
            let rowIndex = this.randomNumber(counter);
            let columnIndex = this.randomNumber(counter);
            if(!(rowIndex == row && columnIndex == column)) {
                if(array[rowIndex][columnIndex] != 'bomb') {
                    array[rowIndex][columnIndex] = 'bomb';
                    placedBombs++;
                }
            }
        }
        for(let i = 0; i < counter; i++) {
            for(let j = 0; j < counter; j++) {
                let value = this.updateCell(counter, i, j, array);
                if(value > -1) {
                    array[i][j] = '' + value;
                }
            }
        }
        return array;
    }

    randomNumber(counter: number) {
        let min = 0;
        let max = counter - 1;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    checkBomb(row: number, column: number, array: string[][]): boolean {
        return array[row][column] == 'bomb';
    }

    updateCell(counter: number, row: number, column: number, array: string[][]): number { 
        if(array[row][column] == 'bomb') {
            return -1;
        }
        let value = 0;
        for(let i = row-1; i <= row+1; i++) {
            for(let j = column-1; j <= column+1; j++) {
                if(i >= 0 && j >= 0 && i < counter && j < counter) {
                    if(array[i][j] == 'bomb') {
                        value++;
                    }
                }
            }
        }
        return value;
    }
}