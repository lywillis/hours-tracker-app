
// conversions from milliseconds
const second = 1000, minute = second * 60, hour = 60 * minute;

export class Duration {
    milliseconds: number;
    constructor(start: Date, end: Date) {
       this.milliseconds =  Math.abs(start.getTime() - end.getTime());
    }

    toString(): string {
        let diff = this.milliseconds;
        let res = '';
        // set hours first
        const hours = Math.floor(diff / hour);
        if (hours > 0) {
            diff -= (hours * hour);
            res += hours.toString() + 'h ';
        }
        // set minutes
        const minutes = Math.floor(diff / minute);
        if (minutes > 0) {
            diff -= (minutes * minute);
            res += minutes.toString() + 'm ';
        }
        // set seconds
        const seconds = Math.floor(diff / second );
        if (seconds > 0) {
            diff -= (seconds * second);
            res += seconds.toString() + 's';
        }
        return res;

    }
}
