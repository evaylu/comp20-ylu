This is a README file for 2048-gamecenter, a server-side web application for COMP 20 assignment 4.

Heroku, Node.js, and Express web framework are used for this program.
In app.js three big parts of this program are inplemented:
1. POST /submit.json API - API - Submits final score and grid for a terminated 2048 game --from any domain. 
2. GET /scores.json API - Returns a JSON string (array of objects) for a specified player with the scores sorted in descending order. 
3. / - Home, the root, the index in HTML.

The structure of this program:

		-------------
		A
		2048 the game
		-------------
			↓	1. username
			↓	2. score	  GET(made by user)
			↓	3. grid			  ↓
-------------------------------------------------
B
Web application -- server-side -- 2048-gamecenter
- Reads post request data
- Parses post request data and store in database
- reads data from database and show results
-------------------------------------------------
			↓	↑
			↓	↑
			↓	↑
		---------------
		C
		Datanase(Mongo)
		---------------
When doing this assignment, I asked Ming and TAs for help. I started this assignment last Sunday(4/5/2014), and spent about 25 hours on this assignment(include reading related materials).


How the score and grid are stored in the 2048 game?
When the browser is ready to render the game, it calls GameManager function(definded in game_manager.js) from applications.js. Inside GameManager, the setup function inits a score(int) and a grid(Grid, an object/function defined in grid.js), where score and and grid will be stored. When a game is over, the LocalStorageManager(defined in local_storage_manager.js) as an input of GameManager function will store score in local storage.


Modifications made in order to send the final score and grid to the web application:
 - index.html
add <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> into the head of the html file.

 - js/game_manager.js 
add the following lines to GameManager.prototype.actuate function, after 
if (this.over) {
	name = "ylu" 
	$.post( "http://mysterious-reef-8155.herokuapp.com/submit.json", {username: name, score: this.score, grid: JSON.stringify(this.serialize().grid)});
