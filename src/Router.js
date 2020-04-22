import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import CreateGame from './CreateGame';
import LiveGame from './LiveGame';
import base from './base';
import { firebaseApp } from './base';

class Router extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
          allGames: [],
          allPlayerNames: []
       };

     }



     componentDidMount(){

       console.log("componentDidMount");
       // Firebase Connections

       base.syncState('allGames', {
         context: this,
         state: 'allGames',
         asArray: true
       });

       base.syncState('allPlayerNames', {
         context: this,
         state: 'allPlayerNames',
         asArray: true
       });

  }





     createNewGame = (gameID) => {
          console.log(gameID);
          // const allGames = [...this.state.allGames, gameID];
          // this.setState({
          //    allGames: allGames
          // });
          const gameNumber = parseInt(gameID);
          this.setState(prevState => ({
            allGames: [...prevState.allGames, gameNumber],
          }));
     }

     createNewPlayerName = (playerName) => {
          console.log(playerName);
          // const allPlayerNames = [...this.state.allPlayerNames, playerName];
          // this.setState({
          //    allPlayerNames: allPlayerNames
          // });
          this.setState(prevState => ({
            allPlayerNames: [...prevState.allPlayerNames, playerName],
          }));

     }




     render() {

          console.log(this.state.allGames);
          console.log(this.state.allPlayerNames);

          return(

               <div className={"clb-grail-body color-" + this.props.settingsColor + " font-" + this.props.settingsFont}>
                    <HashRouter basename="/">
                         <Switch>
                         <Route exact path="/"render={(props) => <Landing {...props}
                              createNewPlayerName={this.createNewPlayerName}
                              allPlayerNames={this.state.allPlayerNames}
                              allGames={this.state.allGames}
                         />}
                         />
                              <Route exact path="/create" render={(props) => <CreateGame {...props}
                                   createNewGame={this.createNewGame}
                                   createNewPlayerName={this.createNewPlayerName}
                                   allPlayerNames={this.state.allPlayerNames}
                                   allGames={this.state.allGames}
                              />}
                              />
                              <Route path="/game/:gameID" render={(props) => <LiveGame {...props}
                                   allPlayerNames={this.state.allPlayerNames}
                                   allGames={this.state.allGames}
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
