import { Duration } from 'src/app/models/Duration';

export class TimeLog {
    id: string;
    start: Date;
    end: Date;
    duration: Duration;

    constructor(start: Date, end: Date, id: string = null) {
        this.start = start;
        this.end = end;
        this.duration = new Duration(start, end);
        this.id = id;
    }
}
