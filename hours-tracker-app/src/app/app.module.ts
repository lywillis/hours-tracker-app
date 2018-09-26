import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ProjectSelectComponent } from './shared/project-select/project-select.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ChartComponent } from './data/chart/chart.component';
import { LogDataComponent } from './data/log-data/log-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LogListComponent,
    TimerComponent,
    DurationPipe,
    DashboardComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectSelectComponent,
    ProjectAddComponent,
    ChartComponent,
    LogDataComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [TimeLogService, TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
