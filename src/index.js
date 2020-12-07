import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");

//render recebe um componente react e um elemento(rootElement)
//e vai montar o componente(App.js)
ReactDOM.render(<App />, rootElement);
