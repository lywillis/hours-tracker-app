import { Component, OnInit } from '@angular/core';
import { TimeLogService } from 'src/app/services/timelog.service';
import { TimeLog } from 'src/app/models/TimeLog';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.less']
})
export class LogListComponent implements OnInit, OnDestroy {
  timeLogs: Array<TimeLog>;
  timeLogSub: Subscription;
  constructor(private timeLogService: TimeLogService) { }
  ngOnInit() {
    this.getTimeLogs();
  }

  ngOnDestroy() {
    this.timeLogSub.unsubscribe();
  }
  deleteTimeLog(timeLog: TimeLog) {
    this.timeLogService.deleteTimeLog(timeLog).then(res => {
      this.getTimeLogs();
    });
  }

  getTimeLogs() {
    this.timeLogSub = this.timeLogService.getTimeLogs().subscribe(logs => {
      this.timeLogs = logs;
      console.log(logs);
  }, err => console.log(err));
}

}
