import EventEmitter from "node:events";

export class ErrorEventHandle extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(10);
    }

    public close(): void {
        this.removeAllListeners();
    }
}

export default new ErrorEventHandle();
