import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.less']
})
export class ProjectSelectComponent implements OnInit {
  projects: Array<Project> = [];
  @Output() project$: EventEmitter<Project> = new EventEmitter();
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  selectProject(project: Project) {
    this.project$.emit(project);
  }
}
