export class Project {
    id: string;
    name: string;
    totalSeconds: number;
    constructor(name: string, id: string = null) {
        this.name = name;
        this.id = id;
    }
}
