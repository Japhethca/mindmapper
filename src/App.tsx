import React from "react";

import logo from "./logo.svg";
import "./App.css";
import MindMapper from "./MindMapper";

function App() {
  return (
    <div className="App">
      <h2
        style={{
          marginTop: "4rem",
          color: "#5d5d5a",
          fontWeight: "bold",
          fontSize: "2.2em",
        }}
      >
        Mind Mapper
      </h2>
      <MindMapper />
    </div>
  );
}

export default App;
