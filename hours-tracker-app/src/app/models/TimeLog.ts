export class TimeLog {
    id?: string;
    start: Date;
    end: Date;
    duration: number; // seconds
    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
        this.duration = Math.floor((this.end.getTime() - this.start.getTime()) / 1000);
    }
}
