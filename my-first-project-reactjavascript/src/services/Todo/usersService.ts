import User from "../../types/User";
import api from "../../../src/axios/http-common";

const getAllUsers = async () => {
  const response = await api.get<Array<User>>("/users");
  return response;
};

const getUserById = async (id: any) => {
  const response = await api.get<Array<User>>(`/users/${id}`);
  return response;
};

const createUser = async (todo: any) => {
  const response = await api.post<Array<User>>("/users", todo);
  return response;
};

const updateUser = async (id: any, data: any) => {
  const response = await api.put<Array<User>>(`/users/${id}`, data);
  return response;
};

const removeUser = async (id: any) => {
  const response = await api.delete<any>(`/users/${id}`);
  return response;
};

const removeAllUser = async () => {
  const response = await api.delete<any>(`/users`);
  return response;
};

const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  removeAllUser,
};

export default UserService;
