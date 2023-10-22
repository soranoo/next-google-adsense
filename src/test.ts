
import { isPublisherId, isSlotId } from "./utils";

describe("utils", () => {
    describe("isPublisherId", () => {
        it("should return true for valid publisher IDs", () => {
            expect(isPublisherId("pub-1234567890123456")).toBe(true);
            expect(isPublisherId("pub-xxxxxxxxx")).toBe(false);
            expect(isPublisherId(undefined)).toBe(false);
        });
    });
    describe("isSlotId", () => {
        it("should return true for valid slot IDs", () => {
            expect(isSlotId("1234567890")).toBe(true);
            expect(isSlotId("xxxxxxxxxx")).toBe(false);
            expect(isSlotId(undefined)).toBe(false);
        });
    });
});