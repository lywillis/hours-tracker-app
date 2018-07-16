import { Component, OnInit } from '@angular/core';
import { TimeLogService } from 'src/app/services/timelog.service';
import { TimeLog } from 'src/app/models/TimeLog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.less']
})
export class LogListComponent implements OnInit {
  timeLogs: Array<TimeLog>;
  constructor(private timeLogService: TimeLogService) { }
  ngOnInit() {
    this.timeLogService.getTimeLogs().then(logs => {
      this.timeLogs = logs;
    });
  }
  deleteTimeLog(timeLog: TimeLog) {
    this.timeLogService.deleteTimeLog(timeLog).then(res => {
      this.timeLogs.splice(this.timeLogs.indexOf(timeLog));
    });
  }

}
