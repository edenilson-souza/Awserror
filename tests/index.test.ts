import { ErrorEvent, TypeErrorEvent, registerLogCallback } from "../src/index";

describe("ErrorEvent Class", () => {
    beforeEach(() => {
        // Limpar o callback estático antes de cada teste
        (ErrorEvent as any).logCallback = undefined;
    });

    test("should register a log callback and call it on throw", () => {
        const logCallback = jest.fn();
        ErrorEvent.registerLogCallback(logCallback);

        const errorData: TypeErrorEvent = {
            message: "Test error message",
            level: "error"
        };

        const errorEvent = new ErrorEvent(errorData);

        try {
            errorEvent.throw();
        } catch (e) {
            // Ignorar a exceção lançada para continuar o teste
        }

        expect(logCallback).toHaveBeenCalledTimes(1);
        expect(logCallback).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Test error message",
                level: "error"
            })
        );
    });

    test("should throw an error with the correct message", () => {
        const errorData: TypeErrorEvent = {
            message: "Test error message",
            level: "error"
        };

        const errorEvent = new ErrorEvent(errorData);

        try {
            errorEvent.throw();
        } catch (e: any) {
            expect(JSON.parse(e.message)).toMatchObject({
                message: "Test error message",
                level: "error",
                status: 500,
                code: "ERR-000"
            });
        }
    });

    test("should correctly create log object", () => {
        const errorData: TypeErrorEvent = {
            message: "Test error message",
            level: "error",
            status: 404,
            code: "NOT_FOUND",
            entity: "User",
            action: "GetUser",
            data: { userId: 123 },
            created_by: "System",
            system: "TestSystem",
            timestamp: new Date("2021-01-01T00:00:00Z")
        };

        const errorEvent = new ErrorEvent(errorData);
        const log = errorEvent.getAll();

        expect(log).toEqual({
            message: "Test error message",
            level: "error",
            status: 404,
            code: "NOT_FOUND",
            entity: "User",
            action: "GetUser",
            data: { userId: 123 },
            created_by: "System",
            system: "TestSystem",
            timestamp: new Date("2021-01-01T00:00:00Z"),
            stack: expect.any(String)
        });
    });

    test("should use default values when optional fields are not provided", () => {
        const errorData: TypeErrorEvent = {
            message: "Test error message",
            level: "error"
        };

        const errorEvent = new ErrorEvent(errorData);
        const log = errorEvent.getAll();

        expect(log).toEqual({
            message: "Test error message",
            level: "error",
            status: 500,
            code: "ERR-000",
            entity: undefined,
            action: undefined,
            data: undefined,
            created_by: undefined,
            system: process.env.SYSTEM_NAME,
            timestamp: expect.any(Date),
            stack: expect.any(String)
        });
    });

    test("should register a log callback with registerLogCallback and call it on throw", () => {
        const logCallback = jest.fn();
        registerLogCallback(logCallback);

        const errorData: TypeErrorEvent = {
            message: "Test error message",
            level: "error"
        };

        const errorEvent = new ErrorEvent(errorData);

        try {
            errorEvent.throw();
        } catch (e) {
            // Ignorar a exceção lançada para continuar o teste
        }

        expect(logCallback).toHaveBeenCalledTimes(1);
        expect(logCallback).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Test error message",
                level: "error"
            })
        );
    });
});
