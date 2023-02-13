import "./dom.js";
import "./board.js";
//import "./test.js";
import "./style.css";
import { COORDINATE_SELECTOR, START_FUNCTION, RESET } from "./dom.js";

//holds computer and user information
function playerStats(boats) {
	this.amount = boats;
}

const user = new playerStats(10);
const computer = new playerStats(10);

//CHECK TO SEE IF THIS IS ACTUALLY WOKING
const userBoardStorage = document
	.getElementById("placementButton")
	.addEventListener("click", function () {
		COORDINATE_SELECTOR();
	});

//create function for computer that picks a random place on the board
//MUST DEDUCT PLAYER LIVES WHEN HIT AND END GAME IF ALL LIVES ARE LOST WITHIN THIS FUNC
const computerChoice = (val) => {
	const board = userBoardStorage;
	let i = Math.floor(Math.random() * 10);
	let j = Math.floor(Math.random() * 10);
	let directionNum = Math.floor(Math.random() * 10);

	if (board[i][j].isFilled == true) {
		computerChoice();
		return;
	} else if (board[i][j].shipThere == true) {
		//see if there are more pices in area -give it another turn
		board[i][j].isFilled = true;
		while (true) {
			// change the boat to red
			val.style["background-color"] = "red";
			//computer wins!!!
			if (user.amount == 0) {
				//call reset button and end game
				RESET();
				break;
			}
			user.amount -= 1;
			//changes corresponding boat on the display board to red
			//loops over display board boats
			const USER_DISPLAY_BLOCKS = Array.from(
				document.querySelectorAll(".display_block")
			);
			for (let i = 0; i < USER_DISPLAY_BLOCKS.length; i++) {
				if (USER_DISPLAY_BLOCKS[i].data_location == board[i][j].data_location) {
					USER_DISPLAY_BLOCKS[i].style["background-color"] = "red";
				}
			}

			if (directionNum < 5) {
				//up
				i -= 1;
				if (i != -1) {
					if (board[i][j].isFilled == true) {
						//give me a ship that has not already been discovered
						computerChoice();
						break;
					} else if (
						board[i][j].shipThere == true &&
						board[i][j].isFilled == false
					) {
						board[i][j].isFilled = true;
					} else {
						board[i][j].isFilled = true; //if nothing is there
						val.innerHTML = "M"; //change dom
						break;
					}
				} else {
					computerChoice();
					break;
				}
			} else if (directionNum >= 5) {
				//right
				j += 1;
				if (j != 10) {
					if (board[i][j].isFilled == true) {
						//give me a ship that has not already been discovered
						computerChoice();
						break;
					}
					if (board[i][j].shipThere == true && board[i][j].isFilled == false) {
						board[i][j].isFilled = true;
					} else {
						board[i][j].isFilled = true; //if nothing is there
						val.innerHTML = "M";
						break;
					}
				} else {
					computerChoice();
					break;
				}
			}
		}
	} else if (board[i][j].shipThere == false && board[i][j].isFilled == false) {
		//give it a dot
		board[i][j].isFilled = true;
		val.innerHTML = "M";
		//next player turn
	}
};

//flow of game
//put in start button

//start button return value
const computerBoardStorage = document
	.querySelector("footer button")
	.addEventListener("click", function () {
		START_FUNCTION();
	});

const playerChoice = (val) => {
	let computerBoard = computerBoardStorage; //must use computer random generated board
	let selectedTblData = undefined;

	for (let i = 0; i < computerBoard.length; i++) {
		for (let j = 0; j < computerBoard[i].length; j++) {
			if (location == computerBoard[i][j].verboseNum) {
				selectedTblData = computerBoard[i][j];
			}
		}
	}

	//user wins!!!
	if (computer.amount == 0) {
		//call reset button and end game
		RESET();
		return;
	}

	//nothing there
	else if (
		selectedTblData.shipThere == false &&
		selectedTblData.isFilled == false
	) {
		selectedTblData.isFilled = true;
		val.innerHTML = "M";
		computerChoice(val); //computer turn
		//change dom to dot
	}

	//shipthere
	else if (
		selectedTblData.shipThere == true &&
		selectedTblData.isFilled == false
	) {
		computer.amount -= 1;
		selectedTblData.isFilled = true;
		val.style["background-color"] = "red";
		//change dom to red
		//changes corresponding boat on the display board to red
		//loops over display board boats
		const COM_DISPLAY_BLOCKS = Array.from(
			document.querySelectorAll(".com_display_block")
		);
		for (let i = 0; i < COM_DISPLAY_BLOCKS.length; i++) {
			if (
				COM_DISPLAY_BLOCKS[i].data_location == selectedTblData.data_location
			) {
				COM_DISPLAY_BLOCKS[i].style["background-color"] = "red";
			}
		}
	}

	//already filled
	else {
		//hide mouse over it or something
		console.log("already filled");
	}
};

const GAMEFLOW_TRIGGER = Array.from(
	document.querySelectorAll(".board_container:nth-of-type(2) tr td")
).forEach(function (val) {
	val.addEventListener("click", function () {
		playerChoice(val);
	});
});
