import { SHIP_PLACEMENT, BOARD_CREATOR } from "./board.js";

const RESET = () => {
	// reset text back to start text
	//reset user and computer object info (this auto... happens when placement and start button is hit)
	//lock comp board
	//reset coord box values and colors

	document.querySelector("main header p:last-child").innerHTML =
		"Place your ships then press start";

	const COORD_BOXES = Array.from(document.querySelectorAll(".coord_box"));

	const toText = Array.from(
		document.querySelectorAll(".ship_select_container .placementBoard p")
	);

	toText.forEach(function (val) {
		val.style.display = "inline-block";
	});

	const COM_DISPLAY_BLOCKS = Array.from(
		document.querySelectorAll(".com_display_block")
	);

	const USER_DISPLAY_BLOCKS = Array.from(
		document.querySelectorAll(".display_block")
	);

	COORD_BOXES.forEach(function (val) {
		val.style.display = "inline-block";
		val.innerHTML = "";
	});

	COM_DISPLAY_BLOCKS.forEach(function (val) {
		val.setAttribute("style", "background-color:rgb(0, 184, 9)");
	});

	USER_DISPLAY_BLOCKS.forEach(function (val) {
		val.setAttribute("style", "background-color:rgb(0, 184, 9)");
	});

	//reset computer board dom and player board dom
	const userBoard = Array.from(
		document.querySelectorAll(".board_container_user td")
	);
	const compBoard = Array.from(
		document.querySelectorAll(".board_container_comp td")
	);

	userBoard.forEach(function (val) {
		val.setAttribute("style", "background-color:rgb(0, 184, 9)");
		val.innerHTML = "";
	});
	compBoard.forEach(function (val) {
		val.setAttribute("style", "background-color:rgb(0, 184, 9)");
		val.innerHTML = "";
	});

	document.getElementById("placementButton").style.display = "block";
};

//converts values from the coordinate selector function to proper game board index values i.e. A becomes 0
const VALUE_CONVERTER = (value1, value2, value3) => {
	//above values are coordinate box values
	const Letters = {
		A: 0,
		B: 1,
		C: 2,
		D: 3,
		E: 4,
		F: 5,
		G: 6,
		H: 7,
		I: 8,
		J: 9,
	};

	//this ideally creates a new array of converted values
	let mutatedArr = [value1.value, value2.value, value3.value].map(function (
		val
	) {
		if (isNaN(+val) && val != "") {
			let allCaps = val.toUpperCase();
			let { ltrMatch = allCaps } = Letters; //matches letter with above object
			//-will return undefined if letter is not found
			return Letters[ltrMatch];
		} else if (typeof +val == "number") {
			return +val;
		} else {
			// for any other string  value
			return undefined;
		}
	});

	if (
		mutatedArr.every(function (val) {
			//checks to see if every value in the array is a number
			return typeof val == "number";
		}) == false
	) {
		return undefined;
	} else {
		return mutatedArr;
	}
};

//Actually places ships on board and properly colors them
const PLACE_SHIPS = (ship, m, coordboxlocation) => {
	const tblData = Array.from(
		document.querySelectorAll(".board_container_user td")
	);
	//check to see if a ship is already in slot, if so break (stops user from placing piece in same slot)
	if (ship.shipThere == true) {
		RESET(); //Gets rid of prev filled td
		return true;
	}

	while (m < 120) {
		//loop until correct td is found and fill it (ship is placed here) -m represents the td index
		if (m == ship.verboseNum) {
			tblData[m].style["background-color"] = "white";
			break;
		}
		m++;
	}

	//create custom key that associates dom data-keys with placed boat on board (for color changes on display)
	ship.data_location = coordboxlocation;
	// place vertical
	ship.shipThere = true;
};

//makes sure ships are placed the proper amount of times and associates display tray ships with board ships
const USER_PLACEMENT_LOGIC = (
	gameboardArr, //user gameboard
	convertedValuesArr,
	firstboxVal, //determines the direction of ship placement
	iter,
	coordboxesArr, //determines the direction of ship placement
	coordboxlocation
) => {
	let invalid_Amount = false;
	let j = 1; //breaks loop if index to and from number does not match the number of avali ships
	let m = 0; //controls dom block color change
	let l = 1; //controls data-location key placement

	//run loop first, don't place pieces, if loop goes over a certain amount of times break
	for (let i = convertedValuesArr[1]; i <= convertedValuesArr[2]; i++) {
		//if user puts in a less than valid range
		if (i == convertedValuesArr[2] && iter > j) {
			invalid_Amount = true;
			break;
		} else if (j > iter) {
			invalid_Amount = true;
			break;
		}

		j += 1;
	}

	if (invalid_Amount == true) {
		return true;
	}

	//Place ships and SET BOARD TO PROPER FILLED COLORS
	for (let k = convertedValuesArr[1]; k <= convertedValuesArr[2]; k++) {
		//place vertical
		if (isNaN(+coordboxesArr[firstboxVal].value)) {
			let placementHolder = PLACE_SHIPS(
				gameboardArr[k][convertedValuesArr[0]],
				m,
				coordboxlocation
			);
			if (placementHolder == true) {
				return true;
			}
			coordboxlocation++;
		} else {
			//place horizontal
			let placementHolder = PLACE_SHIPS(
				gameboardArr[convertedValuesArr[0]][k],
				m,
				coordboxlocation
			);
			if (placementHolder == true) {
				return true;
			}
			coordboxlocation++;
		}
	}
};

//TAKES IN VALUES FROM THE USER SHIP PLACEMENT BOARD, CONVERTS THEM TO USEABLE VALUES,
//AND PLACES THEM ON THE GAME BOARD
const COORDINATE_SELECTOR = () => {
	//make start button appear
	const START_BUTTON = document.querySelector(".start_button");
	START_BUTTON.style.display = "block";
	RESET(); //clean values at start
	const COORD_BOXES = Array.from(document.querySelectorAll(".coord_box"));
	const USERBOARD = BOARD_CREATOR(); //put this into computer choice func //this resets all values

	//THESE ARE THE INDEXES FOR THE COORD INPUT BOXES ABOVE
	let firstVal = 0;
	let secondVal = 1;
	let thirdVal = 2;

	const ITER_ARRAY = [1, 1, 2, 3, 3, 4]; //Alotted placement slots
	let i = 0;
	let itrMatch = 1;
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
			COORD_BOXES,
			itrMatch
		);
		itrMatch += ITER_ARRAY[i];

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

//makes computer board clickable
const START_FUNCTION = () => {
	const toText = Array.from(
		document.querySelectorAll(".ship_select_container .placementBoard p")
	);

	toText.forEach(function (val) {
		val.style.display = "none";
	});

	document.querySelector("main header p:last-child").innerHTML =
		"It's the player's turn";
	// get rid of inputs and place button for user display board
	const COORD_BOXES = Array.from(document.querySelectorAll(".coord_box"));

	document.querySelector(".start_button").style.display = "none";

	document.getElementById("placementButton").style.display = "none";

	COORD_BOXES.forEach(function (val) {
		val.style.display = "none";
	});

	return SHIP_PLACEMENT(BOARD_CREATOR);
};

export { COORDINATE_SELECTOR, START_FUNCTION, RESET };
