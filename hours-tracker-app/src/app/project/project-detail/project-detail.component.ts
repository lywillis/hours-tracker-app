import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.less']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  showLogs() {
    this.projectService.getTimeLogs(this.project).subscribe(logs => {
      console.log(logs);
    });
  }
}
