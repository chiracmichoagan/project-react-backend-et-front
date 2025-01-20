import React, { useState } from "react";
import AuthService from "../../services/Todo/authService";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await AuthService.register(username, email, password);
      if (data.token) { // Assure-toi que le token est présent ici
        localStorage.setItem('token', data.token); }
      console.log("Votre compte a été créé avec succès :", data);
      setSuccessMessage(
        "Inscription réussie ! Vous pouvez maintenant vous connecter."
      );
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-5 bg-white dark:bg-gray-800 rounded-lg shadow-2xl px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
          Welcome to My Company
        </h1>
        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label
              for="username"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              for="email"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              for="password"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              for="confirmPassword"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Already have an account?{" "}
          </span>
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Login
          </a>
        </div>
      </div>
    </>
  );
};

export default Register;
