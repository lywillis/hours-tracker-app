import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import {timer} from 'rxjs/observable/timer';

export interface IDuration {
  start: Date;
  end: Date;
}

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
  @Output() elapsedTime: EventEmitter<IDuration> = new EventEmitter();
  constructor(private timerService: TimerService) { }

  ngOnInit() {
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
    this.timerSub = timer(1, 1000).subscribe(ticks => {
      this.ticks = ticks;
    });
  }
  stopTimer() {
    this.play = false;
    this.timerSub.unsubscribe();
  }

  saveTime() {
    this.elapsedTime.emit({
      start: this.start,
      end: this.end
    });
    this.ticks = 0;
  }

  toggleTimer() {
    this.timerService.toggleStatus();
  }
}
