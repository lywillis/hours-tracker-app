import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Project } from 'src/app/models/Project';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DatePipe } from '@angular/common';
import { TimeLog } from '../../models/TimeLog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projectSub: Subscription;
  projects: Array<Project>;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.projectedEdited.subscribe(() => this.getProjects());
    this.getProjects();
  }
  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  getProjects() {
    this.projectSub = this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
  deleteProject(project: Project) {
    this.projectService.deleteProject(project);
  }

}
