import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SettingsComponent } from './components/settings/settings.component';
import { HintsComponent } from './components/hints/hints.component';
import { BoardComponent } from './components/board/board.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    LanguageSelectorComponent,
    SettingsComponent,
    HintsComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
