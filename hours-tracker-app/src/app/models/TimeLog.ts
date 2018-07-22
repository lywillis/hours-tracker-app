export class TimeLog {
    id: string;
    start: Date;
    end: Date;
    get duration(): number  {
        return Math.floor((this.end.getTime() - this.start.getTime()) / 1000);
    }
    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }
}
