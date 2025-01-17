import React, { useState, useEffect } from "react";
import TodoService from "../services/Todo/Service";

function Modal({ isOpen, onClose, task, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setContent(task.content);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, content });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <h2>Modifier la tâche</h2>
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Description</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les tâches
  useEffect(() => {
    retrieveTasks();
  }, []);

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
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

  const setActiveTask = (task, index) => {
    setCurrentTask(task);
    setCurrentIndex(index);
  };

  const removeAllTask = () => {
    TodoService.removeAllTodo()
      .then((response) => {
        console.log(response.data);
        retrieveTasks();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TodoService.findByTitle(searchTitle)
      .then((response) => {
        setTasks(response.data);
        setCurrentTask();
        setCurrentIndex(-1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTask = (updatedTask) => {
    TodoService.updateTodo(updatedTask.id, updatedTask)
      .then(() => {
        retrieveTasks();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTask = (id) => {
    if (id) {
      TodoService.removeTodo(id)
        .then((response) => {
          console.log(response.data);
          retrieveTasks();
          setCurrentTask();
          setCurrentIndex(-1);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("id not found");
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const openModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
    console.log("openModal");
  };

  const closeModal = () => {
    setCurrentTask(null);
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="dark:bg-gray-800 w-screen flex justify-center py-4">
        <form action="/search" className="max-w-[480px] w-full px-4">
          <div className="relative">
            <input
              type="text"
              value={searchTitle}
              onChange={onChangeSearchTitle}
              className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
              placeholder="Search"
            />
            <button type="button" onClick={findByTitle}>
              <svg
                className="text-teal-400 h-5 w-5 absolute top-3.5 right-3 fill-current dark:text-teal-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.966 56.966"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap justify-center px-3 py-3">
        {currentTasks.length > 0 &&
          currentTasks.map((task, index) => (
            <div
              key={task.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-2 bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{task.title}</div>
                <p className="text-gray-700 text-base">{task.content}</p>
              </div>
              <div className="px-6 flex gap-2 py-4">
                {/* <button
                  onClick={() => setActiveTask(task, index)}
                  className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 transition-colors duration-300"
                >
                  Details
                </button> */}
                <button
                  onClick={() => openModal(task)}
                  className="bg-yellow-500 text-white rounded px-3 py-1 hover:bg-yellow-600 transition-colors duration-300"
                >
                  Modifier
                </button>
                <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={currentTask}
        onSave={updateTask}
      />
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition-colors duration-300"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-center my-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllTask}>
          Remove All
        </button>
      </div>
    </>
  );
}
