import { Duration } from 'src/app/models/Duration';

export class TimeLog {
    _id: string;
    start: Date;
    end: Date;
    duration: Duration;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
        this.duration = new Duration(start, end);
    }
}
