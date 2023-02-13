import { SHIP_PLACEMENT, BOARD_CREATOR } from "./board.js";

const RESET = (pass) => {
	// reset text back to start text
	//reset computer board dom and player board dom
	//reset user and computer object info (this auto... happens when placemnt and start button is hit)
	//lock comp board
	//reset coord box values and colors
	console.log("reset");
};

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
	];

	let mutatedArr = [value1, value2, value3].map(function (val) {
		if (typeof val == "string") {
			allCaps = val.toUpperCase();
			let { allCaps } = Letters;
			//if range is beyond the scope of letters break
			return allCaps;
		} else if (typeof val == "number" && val != 0) {
			//don't let user put in 0
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
	let l = 1; //controls data-location key placement
	let m = 0; //controls dom block color change
	const tblData = Array.from(document.querySelectorAll("td"));

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

	//else go back and place pieces // SET BOARD TO PROPER FILLED COLORS
	for (let k = convertedValuesArr[1]; k <= convertedValuesArr[2]; k++) {
		//go horizontal or vertical
		if (typeof coordboxesArr[firstboxVal].value == "string") {
			//check to see if a ship is already in slot, if so break
			if (gameboardArr[k][convertedValuesArr[0]].shipThere == true) {
				return true;
				//CALL RESET function with condition
			}
			// eslint-disable-next-line no-constant-condition
			while (false) {
				if (
					tblData[m].verboseNum ==
					gameboardArr[k][convertedValuesArr[0]].verboseNum
				) {
					tblData[m].style["background-color"] = "green";
					break;
				}
				m++;
			}

			//create custom key that associates dom data-keys with placed boat
			gameboardArr[k][convertedValuesArr[0]].data_location = l;
			//vertical
			gameboardArr[k][convertedValuesArr[0]].shipThere = true;
			l++;
		} else {
			//check to see if a ship is already in slot, if so break
			if (gameboardArr[convertedValuesArr[0]][k].shipThere == true) {
				return true;
				//CALL RESET function with condition-this will clean up the boards values
			}

			while (false) {
				if (
					tblData[m].verboseNum ==
					gameboardArr[convertedValuesArr[0]][k].verboseNum
				) {
					tblData[m].style["background-color"] = "green";
					break;
				}
				m++;
			}
			//create custom key that associates dom data-keys with placed boat
			gameboardArr[convertedValuesArr[0]][k].data_location = l;
			//horizontal
			gameboardArr[convertedValuesArr[0]][k].shipThere = true;
			l++;
		}
	}
};

//TAKES IN VALUES FROM THE USER SHIP PLACEMENT BOARD, CONVERTS THEM TO USEABLE VALUES,
//AND PLACES THEM ON THE GAME BOARD
const COORDINATE_SELECTOR = () => {
	RESET(); //clean values at start
	const COORD_BOXES = Array.from(document.querySelectorAll(".coord_box"));
	const USERBOARD = BOARD_CREATOR(); //put this into computer choice func //this resets all values

	//THESE ARE THE INDEXES FOR THE COORD INPUT BOXES ABOVE
	let firstVal = 0;
	let secondVal = 1;
	let thirdVal = 2;

	const ITER_ARRAY = [1, 1, 2, 3, 3, 4]; //Alotted placement slots
	let i = 0;
	while (i < ITER_ARRAY.length) {
		let convertedValues = VALUE_CONVERTER(
			COORD_BOXES[firstVal],
			COORD_BOXES[secondVal],
			COORD_BOXES[thirdVal]
		);

		//if an out of index value is inputed i.e. j or 0
		if (convertedValues == undefined) {
			alert("Please enter a valid value");
			RESET();
			break;
		}

		const logicStorage = USER_PLACEMENT_LOGIC(
			USERBOARD,
			convertedValues,
			firstVal,
			ITER_ARRAY[i],
			COORD_BOXES
		);

		//if any values go beyond alotted slots
		if (logicStorage == true) {
			alert("Please enter a valid placement range");
			RESET();
			break;
		}

		(firstVal += 3), (secondVal += 3), (thirdVal += 3), i++;
	}

	//if no error has been thrown
	if (i > 5) {
		return USERBOARD;
	}
};

//will unlock gameboard among other things
//user must have placed pieces or error will show
const START_FUNCTION = () => {
	//make computer board clickable
	// get rid of inputs and place button for user display board
	return SHIP_PLACEMENT(BOARD_CREATOR);
};

export { COORDINATE_SELECTOR, START_FUNCTION, RESET };
