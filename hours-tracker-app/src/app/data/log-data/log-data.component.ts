import { Component, OnInit, Input} from '@angular/core';
import { Project } from '../../models/Project';
import { ChartService, Datum } from '../../services/chart.service';
import { TimeLog } from '../../models/TimeLog';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-data',
  templateUrl: './log-data.component.html',
  styleUrls: ['./log-data.component.less']
})
export class LogDataComponent implements OnInit {
  project: Project;
  datum: Array<Datum>;
  chartLabels: any = {};
  interval = 'Month';
  constructor(private chartService: ChartService,
    private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id).then(project => {
      this.chartService.setProject(project);
      this.project = project;
      this.datum = this.chartService.getData(this.interval);
      this.chartLabels = this.chartService.getChartLabels();
    });
  }

  setTimeInterval(interval: string) {
    this.interval = interval;
    this.datum = this.chartService.getData(this.interval);
    this.chartLabels = this.chartService.getChartLabels();
  }

}
