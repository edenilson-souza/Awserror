export type LogCallback = (logEvent: TypeErrorEvent) => void;

export function registerLogCallback(callback: LogCallback): void {
    ErrorEvent.registerLogCallback(callback);
}

export type TypeErrorEvent = {
    message: string;
    level: "info" | "error" | "warning" | "debug" | "success" | "critical" | "alert" | "emergency";
    status?: number;
    code?: string;
    entity?: string;
    action?: string;
    data?: any;
    timestamp?: Date;
    created_by?: string;
    system?: string;
    stack?: string;
};

export class ErrorEvent {
    private message: string;
    private level: "info" | "error" | "warning" | "debug" | "success" | "critical" | "alert" | "emergency";
    private status?: number;
    private code?: string;
    private entity?: string;
    private action?: string;
    private data?: any;
    private timestamp?: Date;
    private created_by?: string;
    private system?: string;
    private stack?: string;

    private static logCallback?: LogCallback;

    constructor(data: TypeErrorEvent) {
        this.message = data.message;
        this.level = data.level;
        this.status = data.status ?? 500;
        this.code = data.code ?? "ERR-000";
        this.entity = data.entity;
        this.action = data.action;
        this.data = data.data;
        this.created_by = data.created_by;
        this.stack = new Error().stack;
        this.system = data.system ?? process.env.SYSTEM_NAME;
        this.timestamp = data.timestamp ?? new Date();
    }

    static registerLogCallback(callback: LogCallback): void {
        this.logCallback = callback;
    }

    throw(): never {
        this.SEND_LOG_EVENT();
        const atts = { status: true, code: true, timeStamp: true };
        const data = this.getError(atts);
        throw new Error(this.ErrorMessage(data));
    }

    SEND_LOG_EVENT(): void {
        if (ErrorEvent.logCallback) {
            ErrorEvent.logCallback(this.getAll());
        }
    }

    getAll(): TypeErrorEvent {
        return {
            message: this.message,
            level: this.level,
            status: this.status,
            code: this.code,
            entity: this.entity,
            action: this.action,
            data: this.data,
            timestamp: this.timestamp,
            created_by: this.created_by,
            system: this.system,
            stack: this.stack
        };
    }

    getError(atts?: any): TypeErrorEvent {
        let errorEvent: TypeErrorEvent = {
            message: this.message,
            level: this.level
        };
        if (atts.status) errorEvent.status = this.status;
        if (atts.code) errorEvent.code = this.code;
        if (atts.entity) errorEvent.entity = this.entity;
        if (atts.action) errorEvent.action = this.action;
        if (atts.data) errorEvent.data = this.data;
        if (atts.timestamp) errorEvent.timestamp = this.timestamp;
        if (atts.created_by) errorEvent.created_by = this.created_by;
        if (atts.system) errorEvent.system = this.system;
        if (atts.stack) errorEvent.stack = this.stack;

        return errorEvent;
    }

    getMessage(): string {
        return `[${this.level}] ${this.message}`;
    }

    private ErrorMessage(data: TypeErrorEvent): string {
        return JSON.stringify(data);
    }
}
