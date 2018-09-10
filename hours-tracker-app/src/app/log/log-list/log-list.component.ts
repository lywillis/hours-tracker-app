import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { TimeLog } from 'src/app/models/TimeLog';
import { DatePipe } from '@angular/common';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { Subscription } from 'rxjs/internal/Subscription';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.less']
})
export class LogListComponent implements OnInit, OnDestroy {
  @Input() project: Project;
  timeLogSub: Subscription;
  timeLogs: Array<TimeLog>;
  constructor(private projectService: ProjectService) { }
  ngOnInit() {
    this.projectService.timeEdited.subscribe(() => this.getTimeLogs());
    this.getTimeLogs();
  }

  ngOnDestroy() {
    this.timeLogSub.unsubscribe();
  }
  getTimeLogs() {
    this.timeLogSub = this.projectService.getTimeLogs(this.project).subscribe(logs => {
      this.timeLogs = logs;
    });
  }

  deleteTimeLog(log: TimeLog) {
    this.projectService.deleteLog(this.project, log);
  }
}
