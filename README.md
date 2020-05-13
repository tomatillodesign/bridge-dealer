## Bridge Dealer TO DO

In LiveGame, each player "pings" Firebase with a shortId and a timestamp every 20 seconds. These get logged into an object.

When JoinGame is called up, if visitor enters a current gameID and any of the players have a timestamp of more than 40 seconds in the past,
then that player is assumed to be missing and anyone can rejoin the game as that player (without disrupting the current hand).

- ~~Message if Join Game ==> Game is full (try a different ID or create a game)~~
- ~~Clean up console.log and code (unused vars, etc.)~~
- ~~DONE! Warning message if clicking on logo or back browser button: https://code-maven.com/prevent-leaving-the-page-using-plain-javascript~~
