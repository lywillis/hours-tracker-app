export class Project {
    id: string;
    name: string;
    totalSeconds: number;
    createdAt: Date;
    constructor(name: string) {
        this.name = name;
        this.totalSeconds = 0;
    }
}
