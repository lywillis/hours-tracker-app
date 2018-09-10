import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/Project';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UniqueProjectValidator } from 'src/app/shared/validators/unique-project-validator';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.less']
})
export class ProjectAddComponent implements OnInit {
  get name() {
    return this.projectForm.get('name');
  }
  constructor(private projectService: ProjectService) { }
    projectForm: FormGroup = new FormGroup({
      name: new FormControl('',
        [Validators.required],
        [UniqueProjectValidator(this.projectService)
      ]
      )
    });

  ngOnInit() {}

  addProject() {
  }
}
