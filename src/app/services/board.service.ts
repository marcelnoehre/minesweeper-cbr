import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BoardService {

    private cellsPlanned: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
    private cellsRevealed: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]); 
    private revealedArray: string[][] = [];
    private plannedArray: string[][] = [];

    setCellsPlanned(row: number, column: number, value: string) {
        this.plannedArray[row][column] = value;
        this.cellsPlanned.next(this.plannedArray);
    }

    setCellsRevealed(row: number, column: number, value: string) {
        this.revealedArray[row][column] = value;
        this.cellsRevealed.next(this.revealedArray);
    }

    get cellsPlanned$() {
        return this.cellsPlanned.asObservable();
    }

    get cellsRevealed$() {
        return this.cellsRevealed.asObservable();
    }

    revealCell(row: number, column: number) {
        this.revealedArray[row][column] = this.plannedArray[row][column];
        this.cellsRevealed.next(this.revealedArray);
    }

    setupRevealed(counter: number) {
        for (let i = 0; i < counter; i++) {
            let innerArray: string[] = [];
            for(let j = 0; j < counter; j++) {
                innerArray.push('facingDown');
            }
            this.revealedArray.push(innerArray); 
        }
        this.cellsRevealed.next(this.revealedArray);
    }

    setupPlanned(counter: number, row: number, column: number, totalBombs: number) {
        for (let i = 0; i < counter; i++) {
            let innerArray: string[] = [];
            for(let j = 0; j < counter; j++) {
                innerArray.push('0');
            }
            this.plannedArray.push(innerArray); 
        }
        let placedBombs = 0;
        while(placedBombs != totalBombs) {
            let rowIndex = this.randomNumber(counter);
            let columnIndex = this.randomNumber(counter);
            if(!(rowIndex == row && columnIndex == column)) {
                if(this.plannedArray[rowIndex][columnIndex] != 'bomb') {
                    this.plannedArray[rowIndex][columnIndex] = 'bomb';
                    placedBombs++;
                }
            }
        }
        for(let i = 0; i < counter; i++) {
            for(let j = 0; j < counter; j++) {
                this.updateCell(counter, i, j);
            }
        }
        this.cellsPlanned.next(this.plannedArray);
    }

    randomNumber(counter: number) {
        let min = 0;
        let max = counter - 1;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    updateCell(counter: number, row: number, column: number) { 
        if(this.plannedArray[row][column] != 'bomb') {
            let value = 0;
            for(let i = row-1; i <= row+1; i++) {
                for(let j = column-1; j <= column+1; j++) {
                    if(i >= 0 && j >= 0 && i < counter && j < counter) {
                        if(this.plannedArray[i][j] == 'bomb') {
                            value++;
                        }
                    }
                }
            }
            this.plannedArray[row][column] = '' + value;
        }
    }

    openSurround(row: number, column: number, counter: number, revealedCounter: number) {
        //TODO renew
        for(let i = row-1; i <= row+1; i++) {
            for(let j = column-1; j <= column+1; j++) {
                if(i >= 0 && j >= 0 && i < counter && j < counter) {
                    if(this.revealedArray[i][j] == 'facingDown') {
                        if(this.plannedArray[i][j] == '0') {
                            this.revealedArray[i][j] = this.plannedArray[i][j];
                            revealedCounter++;
                            revealedCounter = this.openSurround(i, j, counter, revealedCounter);                            
                        } else {
                            this.revealedArray[i][j] = this.plannedArray[i][j];
                            revealedCounter++;
                        }
                    }
                }
            }
        }
        return revealedCounter;
    }
}