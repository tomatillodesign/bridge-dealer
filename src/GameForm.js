import React from "react";

function CreateGame(props) {

     const gameID = props.gameID;
     const handleGameSubmit = props.handleGameSubmit;
     const handleGameChange = props.handleGameChange;

     return (
          <>
            <form id="create-game-form" onSubmit={handleGameSubmit} >
            <label>
            Your Name:
              <input type="text" onChange={handleGameChange} />
            </label>
              <label>
              Create a New Game ID#:
                <input type="number" onChange={handleGameChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
       </>
     );

}

export default CreateGame;
