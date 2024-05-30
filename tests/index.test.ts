import OrError, { OrErrorEvent, TOrError } from "../src/index";

describe("OrError Class", () => {
    test("should throw an error with the default message", () => {
        try {
            new OrError({
                message: "Internal Server Error"
            }).throw();
        } catch (e: any) {
            expect(JSON.parse(e.message)).toMatchObject({
                message: "Internal Server Error",
                level: "error",
                status: 500
            });
        }
    });

    test("should throw an error with the custom message", () => {
        try {
            new OrError({ message: "Internal Server Error" }).throw({ level: true });
        } catch (e: any) {
            expect(JSON.parse(e.message)).toMatchObject({
                level: "error"
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
            system: process.env.SYSTEM_NAME,
            timestamp: expect.any(Date),
            stack: expect.any(String)
        });
    });

    // test("should listen for 'error' event when throwing exception", () => {
    //     const errorData: TOrError = {
    //         message: "Test error message",
    //         level: "error"
    //     };

    //     expect(OrErrorEvent.listenerCount("error")).toBe(1);

    //     OrErrorEvent.on("error", data => {
    //         expect(data).toEqual({
    //             message: "Test error message",
    //             level: "error",
    //             status: 500,
    //             system: process.env.SYSTEM_NAME,
    //             timestamp: expect.any(Date),
    //             stack: expect.any(String)
    //         });
    //     });

    //     try {
    //         const errorEvent = new OrError(errorData);
    //         errorEvent.throw();
    //     } catch (error) {}

    //     expect(OrErrorEvent.listenerCount("error")).toBe(2);

    // });
    test("should listen for 'error' event when throwing exception", () => {
        const mockListener = jest.fn();

        // Verifique o número inicial de listeners
        expect(OrErrorEvent.listenerCount("error")).toBe(1);

        // Adicione o mockListener como listener do evento "error"
        OrErrorEvent.on("error", mockListener);

        // Verifique se o listener foi adicionado corretamente
        expect(OrErrorEvent.listenerCount("error")).toBe(2);

        try {
            const errorEvent = new OrError({
                message: "Test error message",
                level: "error"
            });
            errorEvent.throw();
        } catch (error) {}

        // Verifique se o mockListener foi chamado com os dados corretos
        expect(mockListener).toHaveBeenCalledWith({
            message: "Test error message",
            level: "error",
            status: 500,
            system: process.env.SYSTEM_NAME,
            timestamp: expect.any(Date),
            stack: expect.any(String)
        });
        expect(mockListener).toHaveBeenCalledTimes(1);

        // Verifique se o listener ainda está registrado
        expect(OrErrorEvent.listenerCount("error")).toBe(2);

        // Remova o mockListener após o teste para evitar interferência em outros testes
        OrErrorEvent.off("error", mockListener);
    });
});
