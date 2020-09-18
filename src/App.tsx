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
        }}
      >
        Mind Mapper
      </h2>
      <MindMapper />
    </div>
  );
}

export default App;
