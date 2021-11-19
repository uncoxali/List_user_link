import React from "react";
import logo from "./logo.svg";
import Main from "./components/main";
import Header from "./components/header";

import "./App.css";

function App() {
  return (
    <div className="bg-gray-900 h-auto">
      <Header />
      <div className="h-screen">
        <Main />
      </div>
    </div>
  );
}

export default App;
