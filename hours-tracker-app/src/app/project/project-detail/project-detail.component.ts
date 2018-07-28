import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/Project';

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
}
