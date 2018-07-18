export class TimeLog {
    id: string;
    start: Date;
    end: Date;
    get duration(): number  {
        return Math.floor((this.end.getTime() - this.start.getTime()) / 1000);
    }
    // milliseconds
    constructor(start: Date, end: Date, id: string = null) {
        this.start = start;
        this.end = end;
        this.id = id;
    }
}
