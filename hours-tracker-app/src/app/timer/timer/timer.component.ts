import { Component, OnInit } from '@angular/core';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import {timer} from 'rxjs/observable/timer';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.less']
})
export class TimerComponent implements OnInit {
  timerStatusSub: Subscription;
  timerSub: Subscription;
  // time display
  ticks: number;
  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerStatusSub = this.timerService.timerStatus$.subscribe((status: TimerStatus) => {
      if (status === TimerStatus.Play) {
        this.startTimer();
      }
      if (status === TimerStatus.Stop) {
        this.stopTimer();
      }
    });

  }

  startTimer() {
    this.timerSub = timer(1, 1000).subscribe(ticks => {
      this.ticks = ticks;
    });
  }
  stopTimer() {
    this.ticks = 0;
    this.timerSub.unsubscribe();
  }
}
