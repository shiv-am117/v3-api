import React, { Component } from "react";
import Youtube from "./Components/youtube/youtube";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">Download songs</h1>
        <Youtube />
      </div>
    );
  }
}

export default App;
