import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
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

  getTime(seconds: number) {
    
  }
}
