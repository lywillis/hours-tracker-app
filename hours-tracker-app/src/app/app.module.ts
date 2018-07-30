import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimeLogService } from 'src/app/services/timelog.service';
import { LogListComponent } from './log/log-list/log-list.component';
import { TimerComponent } from './shared/timer/timer.component';
import { DurationPipe } from './pipes/duration.pipe';
import { AppRoutingModule } from './/app-routing.module';
import { TimerService } from 'src/app/services/timer.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LogListComponent,
    TimerComponent,
    DurationPipe,
    DashboardComponent,
    ProjectListComponent,
    ProjectDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [TimeLogService, TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
