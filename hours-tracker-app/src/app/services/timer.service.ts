import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export enum TimerStatus {
  Play,
  Stopped
}

@Injectable({
  providedIn: 'root'
})

export class TimerService {
  currStatus: TimerStatus = TimerStatus.Stopped;
  timerStatus$: EventEmitter<TimerStatus> = new EventEmitter<TimerStatus>();
  constructor() { }

start() {
  this.currStatus = TimerStatus.Play;
  this.timerStatus$.emit(this.currStatus);
}

stop() {
  this.currStatus = TimerStatus.Stopped;
  this.timerStatus$.emit(this.currStatus);
}

toggleStatus() {
  if (this.currStatus === TimerStatus.Stopped) {
    this.start();
  } else {
    this.stop();
  }
}

}
