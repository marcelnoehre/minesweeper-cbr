import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BoardService {

    private _cellsPlanned: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
    private _cellsRevealed: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]); 
    private _cellsColored: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
    private _revealedArray: string[][] = [];
    private _plannedArray: string[][] = [];
    private _coloredArray: string[][] = [];

    setCellsPlanned(row: number, column: number, value: string) {
        this._plannedArray[row][column] = value;
        this._cellsPlanned.next(this._plannedArray);
    }

    setCellsRevealed(row: number, column: number, value: string) {
        this._revealedArray[row][column] = value;
        this._cellsRevealed.next(this._revealedArray);
    }

    setCellsColored(row: number, column: number, color: string) {
        this._coloredArray[row][column] = color;
        this._cellsColored.next(this._coloredArray);
    }

    get cellsPlanned$() {
        return this._cellsPlanned.asObservable();
    }

    get cellsRevealed$() {
        return this._cellsRevealed.asObservable();
    }

    get cellsColored$() {
        return this._cellsColored.asObservable();
    }

    revealCell(row: number, column: number) {
        this._revealedArray[row][column] = this._plannedArray[row][column];
        this._cellsRevealed.next(this._revealedArray);
    }

    setupRevealed(counter: number) {
        this._revealedArray = [];
        this._coloredArray = [];
        for (let i = 0; i < counter; i++) {
            let innerArray: string[] = [];
            let innerColor: string[] = [];
            for(let j = 0; j < counter; j++) {
                innerArray.push('C');
                innerColor.push('transparent');
            }
            this._revealedArray.push(innerArray); 
            this._coloredArray.push(innerColor);
        }
        this._cellsRevealed.next(this._revealedArray);
        this._cellsColored.next(this._coloredArray);
    }

    setupPlanned(counter: number, row: number, column: number, totalBombs: number) {
        this._plannedArray = [];
        for (let i = 0; i < counter; i++) {
            let innerArray: string[] = [];
            for(let j = 0; j < counter; j++) {
                innerArray.push('0');
            }
            this._plannedArray.push(innerArray); 
        }
        let placedBombs = 0;
        while(placedBombs != totalBombs) {
            let rowIndex = this.randomNumber(counter);
            let columnIndex = this.randomNumber(counter);
            if(!(rowIndex == row && columnIndex == column)) {
                if(this._plannedArray[rowIndex][columnIndex] != 'M') {
                    this._plannedArray[rowIndex][columnIndex] = 'M';
                    placedBombs++;
                }
            }
        }
        for(let i = 0; i < counter; i++) {
            for(let j = 0; j < counter; j++) {
                this.updateCell(counter, i, j);
            }
        }
        this._cellsPlanned.next(this._plannedArray);
    }

    randomNumber(counter: number) {
        let min = 0;
        let max = counter - 1;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    updateCell(counter: number, row: number, column: number) { 
        if(this._plannedArray[row][column] != 'M') {
            let value = 0;
            for(let i = row-1; i <= row+1; i++) {
                for(let j = column-1; j <= column+1; j++) {
                    if(i >= 0 && j >= 0 && i < counter && j < counter) {
                        if(this._plannedArray[i][j] == 'M') {
                            value++;
                        }
                    }
                }
            }
            this._plannedArray[row][column] = '' + value;
        }
    }

    openSurround(row: number, column: number, counter: number, revealedCounter: number) {
        for(let i = row-1; i <= row+1; i++) {
            for(let j = column-1; j <= column+1; j++) {
                if(i >= 0 && j >= 0 && i < counter && j < counter) {
                    if(this._revealedArray[i][j] == 'C') {
                        if(this._plannedArray[i][j] == '0') {
                            this._revealedArray[i][j] = this._plannedArray[i][j];
                            revealedCounter++;
                            revealedCounter = this.openSurround(i, j, counter, revealedCounter);                            
                        } else {
                            this._revealedArray[i][j] = this._plannedArray[i][j];
                            revealedCounter++;
                        }
                    }
                }
            }
        }
        return revealedCounter;
    }
}