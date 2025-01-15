import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from "./components/addTodo";
import TodoList from "./components/TodoList";


export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="#" className="navbar-brand">
          APPTODO
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/voir-todo"} className="nav-link">
              Voir les taches
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add-todo"} className="nav-link">
              Ajouter une tache
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/voir-todo" element={<TodoList />} />
          <Route path="/add-todo" element={<AddTodo />} />
        </Routes>
      </div>
    </div>);
}
