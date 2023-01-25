import "./board.js";
import { SHIP_PLACEMENT, BOARD_CREATOR } from "./board.js";

test("must return an array", () => {
	expect(BOARD_CREATOR()).not.toContain(undefined);
});

test("must return a filled array", () => {
	expect(SHIP_PLACEMENT(BOARD_CREATOR)).not.toContain(undefined);
});

const mockFindFilledValues = SHIP_PLACEMENT(BOARD_CREATOR).filter((obj) => {
	for (let i = 0; i < obj.length; i++) {
		for (let j = 0; j < obj[i].length; j++) {
			obj[j].isFilled = true;
		}
	}
});

test("there must be one object in the array that has a filled value", () => {
	expect(mockFindFilledValues).not.toEqual(undefined);
});

const mockShipRandomizer = jest.fn(() => []);

test("create a test run of the board randomizer function", () => {
	expect(SHIP_PLACEMENT(mockShipRandomizer)).toEqual("test passed");
});
