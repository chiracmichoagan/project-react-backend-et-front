import api from "../../../src/axios/http-common";
const getAllTodos = async () => {
  const response = await api.get("/todos");
  return response;
};

const getTodoById = async id => {
  const response = await api.get(`/todos/${id}`);
  return response;
};

const createTodo = async (todo) => {
  const response = await api.post("/todos", todo);
  return response;
};

const updateTodo = async (id, data) => {
  const response = await api.put(`/todos/${id}`, data);
  return response;
};

const removeTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response;
};

const removeAllTodo = async () => {   
  const response = await api.delete(`/todos`);                                                                                            
  return response;
};

const findByTitle = async title => {
  const response = await api.get(`/todos?title=${title}`);
  return response;
};

const TodoService = { getAllTodos, getTodoById, createTodo, updateTodo, removeTodo, removeAllTodo, findByTitle };

export default TodoService;