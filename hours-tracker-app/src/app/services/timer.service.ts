import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export enum TimerStatus {
  Play,
  Stop
}

@Injectable({
  providedIn: 'root'
})

export class TimerService {
  timerStatus$: EventEmitter<TimerStatus> = new EventEmitter<TimerStatus>();
  constructor() { }

start() {
  this.timerStatus$.emit(TimerStatus.Play);
}

stop() {
  this.timerStatus$.emit(TimerStatus.Stop);
}


}
