import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from 'src/app/timer/timer/timer.component';
import { LogListComponent } from 'src/app/log/log-list/log-list.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'timer', component: TimerComponent },
  { path: 'logs', component: LogListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }