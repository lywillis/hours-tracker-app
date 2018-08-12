import { Component, OnInit, EventEmitter, Input} from '@angular/core';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import {timer} from 'rxjs/observable/timer';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import { TimeLog } from 'src/app/models/TimeLog';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.less']
})

export class TimerComponent implements OnInit {
  timerStatusSub: Subscription;
  play = false;
  timerSub: Subscription;
  start: Date;
  end: Date;
  // time display
  ticks = 0; // in seconds
  @Input() project?: Project;
  selectedProject?: Project;
  constructor(private timerService: TimerService, private projectService: ProjectService) { }

  ngOnInit() {
    if (this.project) {
      this.selectedProject = this.project;
    }
    this.timerStatusSub = this.timerService.timerStatus$.subscribe((status: TimerStatus) => {
      if (status === TimerStatus.Play) {
        this.startTimer();
      }
      if (status === TimerStatus.Stopped) {
        this.stopTimer();
      }
    });

  }

  startTimer() {
    this.play = true;
    this.start = new Date();
    this.timerSub = timer(1, 1000).subscribe(ticks => {
      this.ticks = ticks;
    });
  }
  stopTimer() {
    this.play = false;
    this.end = new Date();
    this.timerSub.unsubscribe();
  }

  saveTime() {
    // add log to current project
    const log = new TimeLog(this.start, this.end);
    this.projectService.addLog(this.selectedProject, log);
    // clear timer
    this.ticks = 0;
  }

  toggleTimer() {
    this.timerService.toggleStatus();
  }
  setProject(event: Project) {
    this.selectedProject = event;
  }
}
