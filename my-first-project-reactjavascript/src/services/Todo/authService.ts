import api from "../../axios/http-common";

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const login = async (email, password) => {
  try {
    const response = await api.post("auth/login", { email, password });
    if (response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de la connexion"
    );
  }
};

const register = async (username, email, password) => {
  try {
    const response = await api.post("auth/register", {
      username,
      email,
      password,
    });
    console.log("Réponse d'inscription réussie :", response.data); // Message de succès
    return response.data; // Retourne uniquement les données de la réponse
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error); // Journalise l'erreur
    throw new Error(
      error.response?.data?.message || "Erreur lors de l'inscription"
    );
  }
};

const logout = async () => {
  try {
    const response = await api.post("auth/logout");
    removeToken();
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de la déconnexion"
    );
  }
};

const AuthService = {
  login,
  register,
  logout,
  getToken,
  setToken,
  removeToken,
};

export default AuthService;
