"use strict"; 
//globally declared variables 
var gamePiece; 
var notify;
var timer;
var spaceY;
var spaceX;
var moveCounter = 0;
var startTime;

window.onload = function ()

{

	var puzzleArea = document.getElementById('puzzlearea');
	gamePiece = puzzleArea.getElementsByTagName('div'); //retrieve element within puzzlearea

	var backgroundOptions = ['b1.jpg', 'b2.jpg', 'b3.jpg', 'b4.jpg'];
	var randomBackground = backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];
	changeBackground(randomBackground);

	for (var i=0; i<gamePiece.length; i++) //applies features to each puzzle piece 

	{

		gamePiece[i].className = 'puzzlepiece'; //setting up the puzzle piece code

		gamePiece[i].style.left = (i%4*100)+'px'; //calculates the position for puzzle pieces from the left of the screen

		gamePiece[i].style.top = (parseInt(i/4)*100) + 'px'; //calculates the position for puzzle pieces from the top of the screen

		gamePiece[i].style.backgroundPosition= '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top; 
		//calculates the position of the background picture so in moves in relation to the puzzle pieces


		gamePiece[i].onmouseover = function() //aplies features when mouse moves over puzzle pieces

		{
			if (checkMove(parseInt(this.innerHTML))) //checks whenever a move is made

			{

				this.style.border = "3px solid black"; //changes to black when a puzzle piece is near an empty space

				this.style.color = "yellow"; //text color changes to black when a puzzle piece is near an empty space

				this.style.textDecoration = "underline"; //underlines the number of the puzzle piece piece

                this.style.backgroundImage="url('background.jpg')"; 
                //sets the image for the puzzle's background 

			}

		};


		gamePiece[i].onmouseout = function() //activates whenever mouse moves out of puzzle piece

		{

			this.style.border = "2px solid black"; //reverts to its original size border 

			this.style.color = "#000000"; //reverts to original text color

			this.style.textDecoration = "none"; //reverts to original text state

		};



		gamePiece[i].onclick = function() //activates when mouse clicks on a puzzle piece

		{

			if (checkMove(parseInt(this.innerHTML))) //checks whether or not the puzzle piece can move into an empty space

			{
				swap(this.innerHTML-1); //moves into an empty space if true


				if (finish()) //checks when the all the 15 pieces are in its right space

				{

					win(); //alerts the player that they have won the game

				}

				return;

			}

		};

    var cheatButton = document.getElementById('cheatButton');
    cheatButton.onclick = function () {
        cheat();
    };

	var stopButton = document.getElementById('stopButton');
    stopButton.onclick = function () {
        stop();
    };

	}

	var shuffle = document.getElementById('shufflebutton'); //initializes the shuffle button

	spaceX = '300px'; 
	spaceY = '300px';

	shuffle.onclick = function() //activates whenever the shuffle button is clicked

	{
		startTimer();
        resetMoves();
		for (var i = 0; i < gamePiece.length; i++) {
			gamePiece[i].onclick = function () {
				if (checkMove(parseInt(this.innerHTML))) {
					swap(this.innerHTML - 1);
					incrementMoves(); // Increment moves on a valid move
	
					if (finish()) {
						win();
					}
				}
			};
		}
		for (var i=0; i<300; i++) 

		{

			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece

			if (rand == 0)

			{

				var temp = up(spaceX, spaceY); 

				if ( temp != -1)

				{

					swap(temp);

				}

			}

			if (rand == 1)

			{

				var temp = down(spaceX, spaceY);

				if ( temp != -1) 

				{

					swap(temp);

				}

			}



			if (rand == 2)

			{

				var temp = left(spaceX, spaceY);

				if ( temp != -1)

				{

					swap(temp);

				}

			}


			if (rand == 3)

			{

				var temp = right(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}

		}

	};
	
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
	
	var backgroundSelect = document.getElementById('backgroundImage');
	backgroundSelect.addEventListener('change', function() {
    var selectedBackground = backgroundSelect.value;
    changeBackground(selectedBackground);
});

};

function changeBackground(backgroundUrl) {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url("' + backgroundUrl + '")';
}

function checkMove(position) // returns true whenever a piece can be moved into an empty space

{

	if (left(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (down(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (up(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (right(spaceX, spaceY) == (position-1))

	{

		return true;

	}

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

function stop() //notifies user that they have won

{

	var body = document.getElementsByTagName('body');

	
	body[0].style.backgroundImage= "url('losebg2.jpg')";
	
	setTimeout(function() {
    clearInterval(timer);}, 1000);
}


function finish() //checks when the game reaches its end

{

	var flag = true;

	for (var i = 0; i < gamePiece.length; i++) //for each puzzle piece 
	{

		var top = parseInt(gamePiece[i].style.top);

		var left = parseInt(gamePiece[i].style.left);


		if (left != (i%4*100) || top != parseInt(i/4)*100) //checks if each piece matches its left and top position

		{

			flag = false;

			break;

		}

	}

	return flag;

}



function left(x, y) //calculates how far to the left a puzzlepiece should position

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);



	if (cordX > 0)

	{

		for (var i = 0; i < gamePiece.length; i++) 

		{

			if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)

			{

				return i;

			} 

		}

	}

	else 

	{

		return -1;

	}

}



function right (x, y) //calculates how far to the right a puzzlepiece should position
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordX < 300)

	{

		for (var i =0; i<gamePiece.length; i++){

			if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function up(x, y) //calculates how far up a puzzlepiece should position
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY > 0)

	{

		for (var i=0; i<gamePiece.length; i++)

		{

			if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 

			{

				return i;

			}

		} 

	}

	else 

	{

		return -1;

	}

}



function down (x, y) //calculates how far down a puzzlepiece should position

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY < 300)

	{

		for (var i=0; i<gamePiece.length; i++)

		{

			if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}

function cheat() {
    // Set the puzzle pieces in the correct order
    for (var i = 0; i < gamePiece.length; i++) {
        gamePiece[i].style.left = (i % 4 * 100) + 'px';
        gamePiece[i].style.top = (parseInt(i / 4) * 100) + 'px';
    }

    // Update move counter
    incrementMoves();

    // Check if the puzzle is solved
    if (finish()) {
        win();
    }
}

function swap (position) //moves the puzzle piece by switching position with an empty space
{

	var temp = gamePiece[position].style.top;

	gamePiece[position].style.top = spaceY;

	spaceY = temp;

	temp = gamePiece[position].style.left;

	gamePiece[position].style.left = spaceX;

	spaceX = temp;

}

function displayFirecrackers() {
    var firecrackerContainer = document.createElement('div');
    firecrackerContainer.id = 'firecracker-container';

    for (var i = 0; i < 10; i++) { // Increase the number of firecrackers to 10
        var firecracker = document.createElement('div');
        firecracker.className = 'firecracker';
        firecracker.style.left = Math.random() * window.innerWidth + 'px';
        firecracker.style.animationDelay = Math.random() + 's';
        firecrackerContainer.appendChild(firecracker);
    }

    document.body.appendChild(firecrackerContainer);

    setTimeout(function () {
        document.body.removeChild(firecrackerContainer);
    }, 3000); // Remove firecrackers after 3 seconds
}

