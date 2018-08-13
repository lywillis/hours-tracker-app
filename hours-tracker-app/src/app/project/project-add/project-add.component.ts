import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.less']
})
export class ProjectAddComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  addProject(project: Project) {
    this.projectService.createProject(project);
  }
}
