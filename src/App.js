import React from 'react';
import Landing from './Landing';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header"><h1><a href="/bridge-dealer">Bridge Dealer</a></h1></header>
      <div className="clb-grail-body">
          <Landing />
      </div>
      <footer className="clb-bridge-dealer-footer">
              Bridge Dealer &middot; <a href="https://github.com/tomatillodesign/bridge-dealer" target="_blank">Version 1.0</a> &middot; By Chris Liu-Beers, <a href="http://tomatillodesign.com" target="_blank">Tomatillo Design</a>
            </footer>
    </div>
  );
}

export default App;
