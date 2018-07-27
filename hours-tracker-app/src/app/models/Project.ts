import { TimeLog } from 'src/app/models/TimeLog';

export class Project {
    _id?: string;
    name: string;
    logs?: Array<TimeLog> = [];
    createdAt?: Date;
    constructor(name: string) {
        this.name = name;
    }
}
