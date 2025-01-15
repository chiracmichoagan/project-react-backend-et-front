import React from "react";
import { useState, Link, useEffect, ChangeEvent } from "react";
import TodoService from "../services/Todo/Service";

export default function TodoList() {

    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    // Charger les tâches
    useEffect(() => {
        retrieveTasks();
    }, []);

    const onChangeSearchTitle = () => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveTasks = () => {
        TodoService.getAllTodos()
            .then((response) => {
                setTasks(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTasks();
        setCurrentTask();
        setCurrentIndex(-1);
    };

    const setActiveTask = () => {
        setCurrentTask(tasks);
        setCurrentIndex();
    };

    const removeAllTask = () => {
        TodoService.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        TodoService.findByTitle(searchTitle)
            .then((response) => {
                setTasks(response);
                setCurrentTask();
                setCurrentIndex(-1);
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>List des tâches</h4>

                <ul className="list-group">
                    {tasks.length > 0 &&
                        tasks.map((task, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTask(task, index)}
                                key={index}
                            >
                                {task.title}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTask}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentTask ? (
                    <div>
                        <h4>tasks</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentTask.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTask.content}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTask.published ? "Published" : "Pending"}
                        </div>

                        <button
                            to={"/tasks/" + currentTask.id}
                            className=" badge badge-warning"
                        >
                            Modifier
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* <br />
                        <p>Click on a Task...</p> */}
                    </div>
                )}
            </div>
        </div>
    );
}