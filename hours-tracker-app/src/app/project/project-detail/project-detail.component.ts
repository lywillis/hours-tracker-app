import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { IDuration } from '../../timer/timer/timer.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.less']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project;
  constructor() { }

  ngOnInit() {
  }

  getTimes(timeInfo: IDuration) {
    const start = timeInfo.start;
    const end = timeInfo.end;
  }
}
