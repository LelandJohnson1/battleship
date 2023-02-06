import { BOARD_CREATOR } from "./board";

const VALUE_CONVERTER = (value1, value2, value3) => {
	const Letters = [
		{ A: 0 },
		{ B: 1 },
		{ C: 2 },
		{ D: 3 },
		{ E: 4 },
		{ F: 5 },
		{ G: 6 },
		{ H: 7 },
		{ I: 8 },
		{ J: 9 },
	];

	let mutatedArr = [value1, value2, value3].map(function (val) {
		if (typeof val == "string") {
			//convert to uppercase
			//COME BACK TO!
			allCaps = val.toUpperCase();
			let { allCaps } = Letters;
			//if range is beyond the scope of letters break
			return allCaps;
		} else if (typeof val == "number") {
			return val - 1;
		} else {
			return undefined;
		}
	});

	if (
		mutatedArr.every(function (val) {
			return typeof val == "number";
		}) == false
	) {
		return undefined;
	} else {
		return mutatedArr;
	}
};

const USER_PLACEMENT_LOGIC = (
	gameboardArr,
	convertedValuesArr,
	firstboxVal,
	iter,
	coordboxesArr
) => {
	let invalid_Amount = false;
	let j = 1; //breaks loop if index to ad from number does not match the number of avali ships

	//run loop first but dont place pieces if loop goes over a certain amount of times break
	for (let i = convertedValuesArr[1]; i <= convertedValuesArr[2]; i++) {
		if (j > iter) {
			invalid_Amount = true;
			break;
		}
		j += 1;
	}
	if (invalid_Amount == true) {
		return true;
	}
	//else go back and place pieces
	for (let k = convertedValuesArr[1]; k <= convertedValuesArr[2]; k++) {
		//go horizontal or vertical
		if (typeof coordboxesArr[firstboxVal].value == "string") {
			//vertical
			gameboardArr[k][convertedValuesArr[0]].shipThere = true;
		} else {
			//horizontal
			gameboardArr[convertedValuesArr[0]][k].shipThere = true;
		}
	}
};

//WHAT HAPPENS IF USEr PLACES BOATS IN SAME SPOT?????
//should clean out values each time this function is triggered
const COORDINATE_SELECTOR = () => {
	const COORD_BOXES = Array.from(document.querySelectorAll(".coord_box"));
	const USERBOARD = BOARD_CREATOR(); //put this into computer choice

	let firstVal = 0;
	let secondVal = 1;
	let thirdVal = 2;

	while (firstVal != 17) {
		if (firstVal == 0 || firstVal == 3) {
			let convertedValues = VALUE_CONVERTER(
				COORD_BOXES[firstVal],
				COORD_BOXES[secondVal],
				COORD_BOXES[thirdVal]
			);

			//if an out of range value is inputed
			if (convertedValues == undefined) {
				break;
			}

			const logicStorage = USER_PLACEMENT_LOGIC(
				USERBOARD,
				convertedValues,
				firstVal,
				1,
				COORD_BOXES
			);

			//if any values go beyond alotted slots
			if (logicStorage == true) {
				break;
			}

			(firstVal += 3), (secondVal += 3), (thirdVal += 3);
		} else if (firstVal == 6) {
			const convertedValues = VALUE_CONVERTER(
				COORD_BOXES[firstVal],
				COORD_BOXES[secondVal],
				COORD_BOXES[thirdVal]
			);

			if (convertedValues == undefined) {
				break;
			}

			const logicStorage = USER_PLACEMENT_LOGIC(
				USERBOARD,
				convertedValues,
				firstVal,
				2,
				COORD_BOXES
			); //add parameters

			if (logicStorage == true) {
				//throw an error too
				break;
			}

			(firstVal += 3), (secondVal += 3), (thirdVal += 3);
		} else if (firstVal == 9 || firstVal == 12) {
			const convertedValues = VALUE_CONVERTER(
				COORD_BOXES[firstVal],
				COORD_BOXES[secondVal],
				COORD_BOXES[thirdVal]
			);

			if (convertedValues == undefined) {
				break;
			}

			const logicStorage = USER_PLACEMENT_LOGIC(
				USERBOARD,
				convertedValues,
				firstVal,
				3,
				COORD_BOXES
			); //add parameters

			if (logicStorage == true) {
				break;
			}

			(firstVal += 3), (secondVal += 3), (thirdVal += 3);
		} else if (firstVal == 15) {
			const convertedValues = VALUE_CONVERTER(
				COORD_BOXES[firstVal],
				COORD_BOXES[secondVal],
				COORD_BOXES[thirdVal]
			);

			if (convertedValues == undefined) {
				break;
			}

			const logicStorage = USER_PLACEMENT_LOGIC(
				USERBOARD,
				convertedValues,
				firstVal,
				4,
				COORD_BOXES
			); //add parameters

			if (logicStorage == true) {
				break;
			}

			(firstVal += 3), (secondVal += 3), (thirdVal += 3);
		}
	}
	return USERBOARD;
};

export { COORDINATE_SELECTOR };
