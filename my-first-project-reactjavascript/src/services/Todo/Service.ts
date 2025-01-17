import api from "../../../src/axios/http-common";
import todoInterface from "../../../src/types/Todo";


const getAllTodos = async () => {
  const response = await api.get<Array<todoInterface>>("/todos");
  return response;
};

const getTodoById = async (id:any) => {
  const response = await api.get<Array<todoInterface>>(`/todos/${id}`);
  return response;
};

const createTodo = async (todo:any) => {
  const response = await api.post<Array<todoInterface>>("/todos", todo);
  return response;
};

const updateTodo = async (id:any, data:any) => {
  const response = await api.put<Array<todoInterface>>(`/todos/${id}`, data);
  return response;
};

const removeTodo = async (id:any) => {
  const response = await api.delete<any>(`/todos/${id}`);
  return response;
};

const removeAllTodo = async () => {   
  const response = await api.delete<any>(`/todos`);                                                                                            
  return response;
};

const findByTitle = async (title:string) => {
  const response = await api.get<Array<todoInterface>>(`/todos?title=${title}`);
  return response;
};

const TodoService = { getAllTodos, getTodoById, createTodo, updateTodo, removeTodo, removeAllTodo, findByTitle };

export default TodoService;