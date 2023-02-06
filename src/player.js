import "./dom.js";
import "./board.js";
//import "./test.js";
import "./style.css";
import { SHIP_PLACEMENT, BOARD_CREATOR } from "./board.js";
import { COORDINATE_SELECTOR } from "./dom.js";

//holds computer and user information
function playerStats(boats) {
	this.amount = boats;
}

const user = new playerStats(10);
const computer = new playerStats(10);

//CHECK TO SEE IF THIS IS ACTUALLY WOKING
let userBoardStorage = document
	.getElementById("placementButton")
	.addEventListener("click", function () {
		COORDINATE_SELECTOR();
	});

//create function for computer that picks a random place on the board
const computerChoice = () => {
	const board = userBoardStorage;
	let i = Math.floor(Math.random() * 10);
	let j = Math.floor(Math.random() * 10);
	let directionNum = Math.floor(Math.random() * 10);

	if (board[i][j].isFilled == true) {
		computerChoice();
		return;
	} else if (board[i][j].shipThere == true) {
		// change the boat to red
		//see if there are more pices in area -give it another turn
		board[i][j].isFilled = true;
		computer.amount -= 1;
		while (true) {
			if (directionNum < 5) {
				//up
				i -= 1;
				if (i != -1) {
					if (board[i][j].shipThere == true && board[i][j].isFilled == false) {
						//give me a ship that has not already been discovered
						board[i][j].isFilled = true;
						computer.amount -= 1;
					} else if (board[i][j].isFilled == true) {
						computerChoice();
						break;
					} else {
						board[i][j].isFilled = true;
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
					if (board[i][j].shipThere == true && board[i][j].isFilled == false) {
						//give me a ship that has not already been discovered
						board[i][j].isFilled = true;
						computer.amount -= 1;
					} else if (board[i][j].isFilled == true) {
						computerChoice();
						break;
					} else {
						board[i][j].isFilled = true;
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
		//next player turn
	}
};

//flow of game
//put in start button

Array.from(
	document.querySelectorAll(".board_container:nth-of-type(2) tr td")
).forEach(function (val, index, arr) {
	val.addEventListener("click", function () {
		let location = index;
		//must use computer random generated board
		//nothing there
		/*if () {}

		//shipthere
		else if (){
		}

		//alreadyfilled
		else {}
		computerChoice();
		*/
	});
});
