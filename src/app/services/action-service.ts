import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, filter, Observable, pluck } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DifficultyEnum } from '../enum/difficulty';
import { BoardService } from './board.service';
import { GameStatsService } from './gamestats.service';
import { StorageService } from './storage.service';
import { TimerService } from './timer.service';
import { TokensService } from './tokens.service';

@Injectable({
	providedIn: 'root'
})
export class ActionService {
    private _difficultyChange$!: Observable<string>;
    private _displayHandbook: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private difficulty!: string; 
    private _cellsPerRow!: number;

    constructor(
        private board: BoardService,
        private gameStats: GameStatsService,
        private tokens: TokensService,
        private storage: StorageService,
        private timer: TimerService,
        private dialog: MatDialog
        ) {
            this._difficultyChange$ = this.storage.storageChange$.pipe(
                filter(({ key }) => key === "difficulty"),
                pluck("id")
            );
            this._difficultyChange$.subscribe(newDifficulty => {
                this.difficulty = newDifficulty;
            });
            this.difficulty = this.storage.getSessionEntry('difficulty');
            if(this.difficulty == DifficultyEnum.beginner) {
                this._cellsPerRow = 10;
            } else if(this.difficulty == DifficultyEnum.advanced) {
                this._cellsPerRow = 15;
            } else {
                this._cellsPerRow = 20;
            }
            this.gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
                this._cellsPerRow = cellsPerRow;
            });
    }

    get displayHandbook() {
        return this._displayHandbook.asObservable();
    }

    openDialog(event: any) {
        let dialogRef = this.dialog.open(DialogComponent);
        let instance = dialogRef.componentInstance;
        instance.result = '' + event;
    }

    toggleHandbook(event: any) {
        this._displayHandbook.next(event);
    }

    restartGame() {
        this.board.setupRevealed(this._cellsPerRow);
        this.gameStats.setup(this.difficulty);
        this.tokens.setup(this.difficulty);
        this.timer.stop();
        this.timer.reset();
    }
}