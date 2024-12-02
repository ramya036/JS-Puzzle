"use strict"; 
//globally declared variables 
var gamePiece; 
var notify;
var timer;
var spaceY;
var spaceX;
var moveCounter = 0;
var startTime;
window.addEventListener('DOMContentLoaded', (event) => {
    const container = document.getElementById('puzzle-container');
    const emptySpace = { x: 2, y: 2 };
    let tiles = [];

    function isMovable(tile) {
        const x = parseInt(tile.style.left, 10) / 100;
        const y = parseInt(tile.style.top, 10) / 100;
        return (x === emptySpace.x && Math.abs(y - emptySpace.y) === 1) ||
               (y === emptySpace.y && Math.abs(x - emptySpace.x) === 1);
    }

    function updateMovableTiles() {
        tiles.forEach(tile => {
            if (isMovable(tile)) {
                tile.classList.add('movablepiece');
            } else {
                tile.classList.remove('movablepiece');
            }
        });
    }

    function moveTile(tile) {
        const x = parseInt(tile.style.left, 10) / 100;
        const y = parseInt(tile.style.top, 10) / 100;

        if (isMovable(tile)) {
            tile.style.top = `${emptySpace.y * 100}px`;
            tile.style.left = `${emptySpace.x * 100}px`;
            emptySpace.x = x;
            emptySpace.y = y;
            updateMovableTiles();

           
        }
    }

    function shuffleTiles() {
        for (let i = 0; i < 300; i++) {
            const movableTiles = tiles.filter(tile => isMovable(tile));
            if (movableTiles.length === 0) {
                continue;
            }
            const randomIndex = Math.floor(Math.random() * movableTiles.length);
            const randomTile = movableTiles[randomIndex];
            moveTile(randomTile);
        }
        updateMovableTiles();
        if (checkWin()) {
            shuffleTiles();
        }
    }

    function checkWin() {
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const x = parseInt(tile.style.left, 10) / 100;
            const y = parseInt(tile.style.top, 10) / 100;
            if (x !== (i % 3) || y !== Math.floor(i / 3)) {
                return false;
            }
        }
        return true;
    }
	
	function startTimer() {
		startTime = new Date().getTime();
		timer = setInterval(updateTimer, 1000);
	}
	
	function updateTimer() {
		var currentTime = new Date().getTime();
		var elapsedTime = Math.floor((currentTime - startTime) / 1000);
		document.getElementById('timer').innerText = 'Time: ' + elapsedTime + 's';
	}
	
	function resetMoves() {
		moveCounter = 0;
		document.getElementById('moves').innerText = 'Moves: 0';
	}

	function incrementMoves() {
		moveCounter++;
		document.getElementById('moves').innerText = 'Moves: ' + moveCounter;
	}
	
    function showWinningNotification() {
        const winningMessage = document.createElement('div');
        winningMessage.textContent = 'Congratulations! You solved the puzzle!';
        winningMessage.className = 'winning-message';
        container.appendChild(winningMessage);
    }

    for (let i = 0; i < 8; i++) {
        const tile = document.createElement('div');
        tile.id = 'tile' + (i + 1);
        tile.classList.add('tile');
        tile.textContent = (i + 1).toString();
        tile.style.left = `${(i % 3) * 100}px`;
        tile.style.top = `${Math.floor(i / 3) * 100}px`;
        tile.style.backgroundImage = "url('background.jpg')";
        tile.style.backgroundPosition = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
        tile.addEventListener('click', () => moveTile(tile));
        tile.addEventListener('mouseenter', () => {
            if (isMovable(tile)) {
                tile.classList.add('movablepiece');
            }
        });
        tile.addEventListener('mouseleave', () => {
            tile.classList.remove('movablepiece');
        });
        tiles.push(tile);
        container.appendChild(tile);
    }

    const shuffleButton = document.getElementById('shuffle-button');
    shuffleButton.addEventListener('click', () => {
        shuffleTiles();
        updateMovableTiles();
		startTimer();
		resetMoves();
    });

    function logicalSolvePuzzle() {
        let interval = setInterval(() => {
            const movableTiles = tiles.filter(tile => isMovable(tile));
            if (movableTiles.length > 0) {
                const randomTile = movableTiles[Math.floor(Math.random() * movableTiles.length)];
                moveTile(randomTile);
            }
    
            if (checkWin()) {
                clearInterval(interval);
                alert("Puzzle Solved!");
            }
        }, 100); // Adjust the interval as needed
    }
    
    updateMovableTiles(); 

});

window.onload = function() {
		
	var backgroundOptions = ['b1.jpg', 'b2.jpg', 'b3.jpg', 'b4.jpg'];
	var randomBackground = backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];
	changeBackground(randomBackground);
	var backgroundSelect = document.getElementById('backgroundImage');
	backgroundSelect.addEventListener('change', function() {
    var selectedBackground = backgroundSelect.value;
    changeBackground(selectedBackground);
});


	var stopButton = document.getElementById('stopButton');
    stopButton.onclick = function () {
        stop();
    };
	}
	
function changeBackground(backgroundUrl) {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url("' + backgroundUrl + '")';
}


function Notify() //notifies the user 

{

	notify --; //decrements the value of 

	if (notify == 0) //if the value reaches the end then

	{

		var body = document.getElementsByTagName('body'); //retrieves body element in html

		body[0].style.backgroundImage= "none"; //reverts to original page background

		alert('Winner! ... Shuffle and Play Again'); //tells the user that they have won the game 

		var para=document.getElementsByClassName('explanation');
	    para[0].style.visibility="visible"; //reverts visiblity to its original state

		return;

	}

	else  (notify % 2) 

	{

		var body = document.getElementsByTagName('body'); 

	    body[0].style.backgroundImage= "url('background.jpg')";
	    //sets background pic to show user that they had completed the puzzle
		
	}

    timer= setTimeout(Notify, 200); //notifies the user for 2 secs
}

function stop() //notifies user that they have won

{

	var body = document.getElementsByTagName('body');

	
	body[0].style.backgroundImage= "url('losebg2.jpg')";

	setTimeout(function() {
    clearInterval(timer);}, 1000);
}


function win() //notifies user that they have won

{

	var body = document.getElementsByTagName('body');

	
	body[0].style.backgroundImage= "url('background.jpg')";

	notify = 10; //initializes notify variable

	timer= setTimeout(Notify, 200);

	var para=document.getElementsByClassName('explanation');
	para[0].style.visibility="hidden"; //hides text when user is being notified

	clearInterval(timer);
    document.getElementById('best-time').innerText = 'Best Time: ' + document.getElementById('timer').innerText;
    document.getElementById('best-moves').innerText = 'Best Moves: ' + moveCounter;
	displayFirecrackers();
	Notify();
}