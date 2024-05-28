import { helloWorld } from "../src/index";

describe("Hello World", () => {
    it("should return 'Hello, world!'", () => {
        expect(helloWorld()).toBe("Hello, world!");
    });
});
