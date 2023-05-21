export class Message {
    message: string;
    priority: boolean;

    constructor(message: string, priority = false) {
        this.message = message;
        this.priority = priority;
    }
}