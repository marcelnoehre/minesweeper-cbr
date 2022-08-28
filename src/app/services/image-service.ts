import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ImageService {
    private _gameIcons: string[] = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', 'mine.png', 'facingDown.png', 'flagged.png'];
    private _icons: string[] = ['ANFÄNGER.png', 'FORTGESCHRITTEN.png', 'EXPERTE.png', 'token.png'];
    private _handbook: string[] = ['difficulties.png', 'flags.png'];
    private _basePath: string = 'assets/images/';
    private _gameIconsPath: string = 'game_icons/';
    private _iconsPath: string = 'icons/';
    private _handbookPath: string = 'handbook/';

    preLoadImages() {
        this._preLoadGameIcons();
        this._preLoadIcons();
        this._preLoadHandbook();
    }

    private _preLoadGameIcons(): void {
        for(let i = 0; i < this._gameIcons.length; i++) {
          let img = new Image();
          img.onload = () => {};
          img.src = this._basePath + this._gameIconsPath + this._gameIcons[i];
        }
    }

    private _preLoadIcons(): void {
        for(let i = 0; i < this._icons.length; i++) {
            let img = new Image();
            img.onload = () => {};
            img.src = this._basePath + this._iconsPath + this._icons[i];
        }
    }

    private _preLoadHandbook(): void {
        for(let i = 0; i < this._handbook.length; i++) {
            let img = new Image();
            img.onload = () => {};
            img.src = this._basePath + this._handbookPath + this._handbook[i];
        }
    }
}
