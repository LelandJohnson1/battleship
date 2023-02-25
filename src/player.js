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

//returns the users gameboard
const userBoardStorage = document
	.getElementById("placementButton")
	.addEventListener("click", function () {
		COORDINATE_SELECTOR();
	});

//start button returns the computer board (calls the SHIP_PLACEMENT(BOARD_CREATOR) func)
let computerBoardStorage = document
	.querySelector("footer button")
	.addEventListener("click", function () {
		START_FUNCTION();
	});

const COMP_SUCCESSFUL_HIT = (i, j, board, td) => {
	if (board[i][j].isFilled == true) {
		//give me a ship that has not already been discovered
		COMPUTERCHOICE();
		return true;
	} else if (board[i][j].shipThere == true && board[i][j].isFilled == false) {
		board[i][j].isFilled = true;
		//will run another iteration of loop
	} else {
		board[i][j].isFilled = true; //if nothing is there
		td.innerHTML = "M";
		return true;
	}
};

//controls computer ship placement logic
const COMPUTERCHOICE = () => {
	const board = userBoardStorage;
	let i = Math.floor(Math.random() * 10);
	let j = Math.floor(Math.random() * 10);
	let directionNum = Math.floor(Math.random() * 10);
	const tblData = Array.from(
		document.querySelectorAll(".board_container_comp td")
	);

	let td = null;
	tblData.forEach(function (val, index) {
		if (index == board[i][j].verboseNum) {
			td = val;
		}
	});

	//the space has already been selected
	if (board[i][j].isFilled == true) {
		COMPUTERCHOICE();
		return;
	}
	//the space has a ship in it
	else if (board[i][j].shipThere == true) {
		board[i][j].isFilled = true;

		while (true) {
			//sets td to hit color if ship has been destroyed
			td = null;
			tblData.forEach(function (val, index) {
				if (index == board[i][j].verboseNum) {
					td = val;
				}
			});

			td.style["background-color"] = "red"; // change the boat to red

			if (user.amount == 0) {
				//computer wins!!!
				alert("The computer Wins!");
				//board locks again
				computerBoardStorage = undefined;
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
			//see if there are more ships in area - if so give it another turn
			if (directionNum < 5) {
				//up
				i -= 1;
				if (i != -1) {
					//stops out of index issue
					let condition_holder = COMP_SUCCESSFUL_HIT(i, j, board, td);

					if (condition_holder == true) {
						break;
					}
				} else {
					//out of index
					COMPUTERCHOICE();
					break;
				}
			} else if (directionNum >= 5) {
				//right
				j += 1;
				if (j != 10) {
					let condition_holder = COMP_SUCCESSFUL_HIT(i, j, board, td);
					if (condition_holder == true) {
						break;
					}
				} else {
					COMPUTERCHOICE();
					break;
				}
			}
		}
	} else if (board[i][j].shipThere == false && board[i][j].isFilled == false) {
		//Nothing is in area
		board[i][j].isFilled = true;
		td.innerHTML = "M";
		//next player turn
	}
};

const playerChoice = (val, index) => {
	let computerBoard = computerBoardStorage; //must use computer random generated board from above func
	//restricts user from clicking computer board start button has not been clicked
	if (computerBoard != undefined) {
		let selectedTblData = undefined;

		//assoc. td (val) with it's computerboard obj match
		for (let i = 0; i < computerBoard.length; i++) {
			for (let j = 0; j < computerBoard[i].length; j++) {
				if (index == computerBoard[i][j].verboseNum) {
					selectedTblData = computerBoard[i][j];
				}
			}
		}

		//user wins!!!
		if (computer.amount == 0) {
			alert("User wins!");
			//board locks again
			computerBoardStorage = undefined;
			RESET();
			return;
		}

		//nothing is in block
		else if (
			selectedTblData.shipThere == false &&
			selectedTblData.isFilled == false
		) {
			selectedTblData.isFilled = true;
			val.innerHTML = "*"; // change block to dot (this is a placeholder for now)
			COMPUTERCHOICE(); //computer turn
		}

		//ship is there
		else if (
			selectedTblData.shipThere == true &&
			selectedTblData.isFilled == false
		) {
			computer.amount -= 1;
			selectedTblData.isFilled = true;
			val.style["background-color"] = "red";

			const COM_DISPLAY_BLOCKS = Array.from(
				document.querySelectorAll(".com_display_block")
			);

			for (let i = 0; i < COM_DISPLAY_BLOCKS.length; i++) {
				//changes corresponding boat on the display board to red
				if (
					COM_DISPLAY_BLOCKS[i].data_location == selectedTblData.data_location
				) {
					COM_DISPLAY_BLOCKS[i].style["background-color"] = "red";
				}
			}
		}

		//already filled
		else {
			alert("already filled");
		}
	} else {
		alert("please press the start button");
	}
};

//calls playerChoice func with selected td
const GAMEFLOW_TRIGGER = Array.from(
	document.querySelectorAll(".board_container:nth-of-type(2) tr td")
).forEach(function (val, index) {
	val.addEventListener("click", function () {
		playerChoice(val, index);
	});
});
