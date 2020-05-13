import React from 'react';
import LiveGame from './LiveGame';

///////////////////////////////////////////////////////////////////////

class ReJoinGame extends React.Component {

     constructor(props) {
          super(props);
          this.state = {

          }

     }



     render() {

          let liveGame = null;
          console.log(this.props.position);

          if( this.props.playerName && this.props.gameID ) {

               if( this.props.position === 'north' ) {
                    liveGame = ( <LiveGame
                                        loggedIn={this.props.playerName}
                                        northName={this.props.playerName}
                                        gameID={this.props.gameID}
                                   />);
               }

               if( this.props.position === 'south' ) {
                    liveGame = ( <LiveGame
                                        loggedIn={this.props.playerName}
                                        southName={this.props.playerName}
                                        gameID={this.props.gameID}
                                   />);
               }

               if( this.props.position === 'east' ) {
                    liveGame = ( <LiveGame
                                        loggedIn={this.props.playerName}
                                        eastName={this.props.playerName}
                                        gameID={this.props.gameID}
                                   />);
               }

               if( this.props.position === 'west' ) {
                    liveGame = ( <LiveGame
                                        loggedIn={this.props.playerName}
                                        westName={this.props.playerName}
                                        gameID={this.props.gameID}
                                   />);
               }

          }




          return (
               <>
               {liveGame}
               </>

          );

     }

}


export default ReJoinGame;
