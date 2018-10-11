import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.less']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.getProject();
  }

  getProject() {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id).then(project => {
      this.projectService.currProject = project;
      this.project = project;
    });
  }
}
