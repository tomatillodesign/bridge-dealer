import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import CreateGame from './CreateGame';
import LiveGame from './LiveGame';

class Router extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
          allGames: [],
          allPlayerNames: []
       };

     }


     createNewGame = (gameID) => {
          console.log(gameID);
          const allGames = [...this.state.allGames, gameID];
          this.setState({
             allGames: allGames
          });
     }

     createNewPlayerName = (playerName) => {
          console.log(playerName);
          const allPlayerNames = [...this.state.allGames, playerName];
          this.setState({
             allPlayerNames: allPlayerNames
          });
     }




     render() {

          console.log(this.state.allGames);

          return(

               <div className={"clb-grail-body color-" + this.props.settingsColor + " font-" + this.props.settingsFont}>
                    <HashRouter basename="/">
                         <Switch>
                         <Route exact path="/"render={(props) => <Landing {...props}
                              createNewPlayerName={this.createNewPlayerName}
                         />}
                         />
                              <Route exact path="/create" render={(props) => <CreateGame {...props}
                                   createNewGame={this.createNewGame}
                              />}
                              />
                              <Route path="/game/:gameID" render={(props) => <LiveGame {...props}

                              />}
                              />
                              <Route component={() => <Landing />}
                              />
                         </Switch>
                    </HashRouter>
          </div>);

     }

}

export default Router;
