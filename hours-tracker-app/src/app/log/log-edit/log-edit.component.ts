import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TimeLog } from 'src/app/models/TimeLog';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/Project';
import { LogDatesValidator } from 'src/app/shared/validators/log-dates-validator';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.less']
})
export class LogEditComponent implements OnInit {
  @Input() log: TimeLog;
  private project: Project;
  constructor(private projectService: ProjectService) { }
  logEditForm: FormGroup;

  ngOnInit() {
    this.logEditForm =  new FormGroup({
      start: new FormControl(this.log.start,
        [Validators.required]
      ),
      end: new FormControl(this.log.end, [Validators.required])
    }, {validators: LogDatesValidator()});
    this.project = this.projectService.currProject;
  }

  updateTimeLog() {
    console.log(this.logEditForm);

  }
}
