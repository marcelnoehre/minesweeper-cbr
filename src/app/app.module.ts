import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { CellComponent } from './components/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    CellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
