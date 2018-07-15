import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimeLogService } from 'src/app/services/timelog.service';
import { LogListComponent } from './log/log-list/log-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LogListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TimeLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
