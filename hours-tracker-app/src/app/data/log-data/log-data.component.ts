import { Component, OnInit, Input} from '@angular/core';
import { Project } from '../../models/Project';
import { ChartService, Datum } from '../../services/chart.service';
import { TimeLog } from '../../models/TimeLog';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-log-data',
  templateUrl: './log-data.component.html',
  styleUrls: ['./log-data.component.less']
})
export class LogDataComponent implements OnInit {
  @Input() project: Project;
  timeLogSub: Subscription;
  datum: Array<Datum> = [];
  constructor(private chartService: ChartService, private projectService: ProjectService) { }

  ngOnInit() {
    this.getTimeLogs();
  }
  getTimeLogs() {
    this.timeLogSub = this.projectService.getTimeLogs(this.project).subscribe(logs => {
     this.datum = this.chartService.groupTimeData(logs);
    });
  }

}
