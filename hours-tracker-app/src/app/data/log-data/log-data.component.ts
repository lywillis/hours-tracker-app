import { Component, OnInit, Input} from '@angular/core';
import { Project } from '../../models/Project';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-log-data',
  templateUrl: './log-data.component.html',
  styleUrls: ['./log-data.component.less']
})
export class LogDataComponent implements OnInit {
  @Input() project: Project;
  constructor(private chartService: ChartService) { }

  ngOnInit() {
  }

}
