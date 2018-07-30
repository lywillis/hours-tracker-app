import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from 'src/app/shared/timer/timer.component';
import { LogListComponent } from 'src/app/log/log-list/log-list.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ProjectListComponent } from 'src/app/project/project-list/project-list.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'timer', component: TimerComponent },
  { path: 'logs', component: LogListComponent},
  { path: 'projects', component: ProjectListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
