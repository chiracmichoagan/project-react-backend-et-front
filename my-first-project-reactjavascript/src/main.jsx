import React from "react";
import ReactDOM from "react-dom/client"; // Importer createRoot depuis react-dom/client
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Sélectionner l'élément racine de votre DOM
const rootElement = document.getElementById("root");

// Créer une racine avec createRoot
const root = ReactDOM.createRoot(rootElement);

// Rendre l'application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
