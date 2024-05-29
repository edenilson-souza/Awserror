import OrError, { TOrError } from "../src/index";
import OrErrorEvent from "../src/eventHandle";

describe("OrError Class", () => {
    beforeEach(() => {
        // Limpar o callback estático antes de cada teste
        OrError.setEventHandle(OrErrorEvent);
    });

    test.skip("should throw an error with the correct message", () => {
        const errorData: TOrError = {
            message: "Test error message"
        };

        const errorEvent = new OrError(errorData);

        try {
            errorEvent.throw();
        } catch (e: any) {
            expect(JSON.parse(e.message)).toMatchObject({
                message: "Test error message",
                level: "error",
                status: 500
            });
        }
    });

    test("should correctly create log object", () => {
        const errorData: TOrError = {
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

        const errorEvent = new OrError(errorData);
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
        const errorData: TOrError = {
            message: "Test error message",
            level: "error"
        };

        const errorEvent = new OrError(errorData);
        const log = errorEvent.getAll();

        expect(log).toEqual({
            message: "Test error message",
            level: "error",
            status: 500,
            code: undefined,
            entity: undefined,
            action: undefined,
            data: undefined,
            created_by: undefined,
            system: process.env.SYSTEM_NAME,
            timestamp: expect.any(Date),
            stack: expect.any(String)
        });
    });
});
