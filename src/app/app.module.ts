import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HintsComponent } from './components/hints/hints.component';
import { BoardComponent } from './components/board/board.component';

import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import { HandbookComponent } from './components/handbook/handbook.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    SettingsComponent,
    HintsComponent,
    BoardComponent,
    DialogComponent,
    HandbookComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
