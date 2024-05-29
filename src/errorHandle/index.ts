import { OrErrorEvent } from "..";

export class OrError {
    private message: string;
    private level: "info" | "error" | "warning" | "debug" | "success" | "critical" | "alert" | "emergency";
    private status?: number;
    private code?: string;
    private entity?: string;
    private action?: string;
    private data?: any;
    private created_by?: string;
    private stack?: string;
    private system?: string;
    private timestamp?: Date;

    constructor(data: TOrError) {
        this.message = data.message;
        this.level = data.level ?? "error";
        this.status = data.status ?? 500;
        this.code = data.code;
        this.entity = data.entity;
        this.action = data.action;
        this.data = data.data;
        this.created_by = data.created_by;
        this.stack = new Error().stack;
        this.system = data.system ?? process.env.SYSTEM_NAME;
        this.timestamp = data.timestamp ?? new Date();
    }

    throw(outputMessage?: TypeErrorMessageOutput): never {
        try {
            this.emitEvent();
            this.newThrow(outputMessage);
        } catch (error: any) {
            throw error;
        }
    }

    private newThrow(outputMessage?: TypeErrorMessageOutput): never {
        let atts = { ...outputMessage, level: true, status: true, code: true, timestamp: true };
        const data: TOrError = this.getError(atts);
        const dataToString: string = this.ErrorMessage(data);
        throw new Error(dataToString);
    }

    emitEvent(): void {
        const data = this.getAll();
        OrErrorEvent.emit("error", data);
        if (this.code) {
            OrErrorEvent.emit(this.code!, data);
        }
    }

    getAll(): TOrError {
        const data = {
            message: this.message,
            level: this.level,
            status: this.status,
            code: this.code,
            entity: this.entity,
            action: this.action,
            data: this.data,
            created_by: this.created_by,
            stack: this.stack,
            system: this.system,
            timestamp: this.timestamp
        };
        return data;
    }

    getError(atts?: TypeErrorMessageOutput): TOrError {
        let errorEvent: TOrError = {
            message: this.message
        };
        if (atts?.level) errorEvent.level = this.level;
        if (atts?.status) errorEvent.status = this.status;
        if (atts?.code) errorEvent.code = this.code;
        if (atts?.entity) errorEvent.entity = this.entity;
        if (atts?.action) errorEvent.action = this.action;
        if (atts?.data) errorEvent.data = this.data;
        if (atts?.created_by) errorEvent.created_by = this.created_by;
        if (atts?.stack) errorEvent.stack = this.stack;
        if (atts?.system) errorEvent.system = this.system;
        if (atts?.timestamp) errorEvent.timestamp = this.timestamp;

        return errorEvent;
    }

    getMessage(): string {
        const message = `[${this.level}] ${this.message}`;
        return message;
    }

    private ErrorMessage(data: TOrError): string {
        return JSON.stringify(data);
    }
}

export type TOrError = {
    message: string;
    level?: "info" | "error" | "warning" | "debug" | "success" | "critical" | "alert" | "emergency";
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

export type TypeErrorMessageOutput = {
    level?: boolean;
    status?: boolean;
    code?: boolean;
    entity?: boolean;
    action?: boolean;
    data?: boolean;
    timestamp?: boolean;
    created_by?: boolean;
    system?: boolean;
    stack?: boolean;
};
