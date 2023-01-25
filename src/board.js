import "./dom.js";

//CREATES GAMEBOARDS
const BOARD_CREATOR = () => {
	let arr = [];
	for (let i = 0; i < 10; i++) {
		arr.push([]);
		for (let j = 0; j < 10; j++) {
			arr[i].push({
				isFilled: false,
				isDestroyed: false,
				Xcoordinate: j,
				Ycoordinate: i,
			});
		}
	}
	return arr;
};

//RANDOMIZES SHIP PLACEMENT
const SHIP_PLACEMENT = (callback) => {
	let board = callback();
	let shipAmounts = [4, 3, 3, 2, 1, 1];

	for (let k = 0; k < shipAmounts.length; k++) {
		while (true) {
			let shipThere = false;
			let startPoint = 0;
			let directionNum = Math.floor(Math.random() * 10);
			let i = Math.floor(Math.random() * 8) + 1; //don't want to include edge pieces in placement
			let j = Math.floor(Math.random() * 8) + 1;

			if (directionNum < 5) {
				if (board[i - shipAmounts[k]] != undefined) {
					//vertical
					while (shipThere == false && startPoint < shipAmounts[k]) {
						if (i != 0) {
							//prevents out of index checking when box is an edge box
							for (
								let yCord = board[i - 1][j - 1].Ycoordinate;
								yCord <= board[i + 1][j + 1].Ycoordinate;
								yCord++
							) {
								for (
									let xCord = board[i - 1][j - 1].Xcoordinate;
									xCord <= board[i - 1][j + 1].Xcoordinate;
									xCord++
								) {
									if (board[yCord][xCord].isFilled == true) {
										shipThere = true;
										break;
									}
								}

								if (shipThere == true) {
									break;
								}
							}
						}

						startPoint += 1; //allows the above while loop to move to and check next block
						if (startPoint < shipAmounts[k]) {
							i--;
						}
					}
				}
				if (shipThere == true) {
					continue;
				}
				if (
					shipThere == false &&
					board[i - shipAmounts[k]] == undefined &&
					startPoint == 0
				) {
					continue;
				}
				for (let l = 0; l < shipAmounts[k]; l++) {
					board[i + l][j].isFilled = true;
				}
				break;
			} else if (directionNum >= 5) {
				if (board[i][j + shipAmounts[k]] != undefined) {
					//horizontal
					while (shipThere == false && startPoint < shipAmounts[k]) {
						if (j != 9) {
							for (
								let yCord = board[i - 1][j - 1].Ycoordinate;
								yCord <= board[i + 1][j + 1].Ycoordinate;
								yCord++
							) {
								for (
									let xCord = board[i - 1][j - 1].Xcoordinate;
									xCord <= board[i - 1][j + 1].Xcoordinate;
									xCord++
								) {
									if (board[yCord][xCord].isFilled == true) {
										shipThere = true;
										break;
									}
								}

								if (shipThere == true) {
									break;
								}
							}
						}

						startPoint += 1;
						if (startPoint < shipAmounts[k]) {
							j++;
						}
					}
				}
				if (shipThere == true) {
					continue;
				}
				if (
					shipThere == false &&
					board[i][j + shipAmounts[k]] == undefined &&
					startPoint == 0
				) {
					continue;
				}
				for (let l = 0; l < shipAmounts[k]; l++) {
					board[i][j - l].isFilled = true;
				}
				break;
			}
		}
	}
	console.group(board);
};

SHIP_PLACEMENT(BOARD_CREATOR);
