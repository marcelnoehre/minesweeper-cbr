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
    private _difficulty!: string; 
    private _cellsPerRow!: number;

    constructor(
        private _board: BoardService,
        private _gameStats: GameStatsService,
        private _tokens: TokensService,
        private _storage: StorageService,
        private _timer: TimerService,
        private _dialog: MatDialog
        ) {
            this._difficultyChange$ = this._storage.storageChange$.pipe(
                filter(({ key }) => key === "difficulty"),
                pluck("id")
            );
            this._difficultyChange$.subscribe(newDifficulty => {
                this._difficulty = newDifficulty;
            });
            this._difficulty = this._storage.getSessionEntry('difficulty');
            if(this._difficulty == DifficultyEnum.beginner) {
                this._cellsPerRow = 10;
            } else if(this._difficulty == DifficultyEnum.advanced) {
                this._cellsPerRow = 15;
            } else {
                this._cellsPerRow = 20;
            }
            this._gameStats.cellsPerRow$.subscribe((cellsPerRow: number) => {
                this._cellsPerRow = cellsPerRow;
            });
    }
    
    get displayHandbook() {
        return this._displayHandbook.asObservable();
    }

    toggleHandbook(event: any) {
        this._displayHandbook.next(event);
    }

    openDialog(event: any) {
        let dialogRef = this._dialog.open(DialogComponent);
        let instance = dialogRef.componentInstance;
        instance.result = '' + event;
    }

    restartGame() {
        this._board.setupRevealed(this._cellsPerRow);
        this._gameStats.setup(this._difficulty);
        this._tokens.setup(this._difficulty);
        this._timer.stop();
        this._timer.reset();
    }
}