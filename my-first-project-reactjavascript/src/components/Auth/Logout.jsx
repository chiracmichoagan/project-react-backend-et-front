import React, { useState } from "react";
import AuthService from "../../services/Todo/authService";

const Logout = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    console.log("Cliquez pour se déconnecter");

    setErrorMessage("Vous devez être connecté pour vous déconnecter.");

    try {
      const response = await AuthService.logout();

      setSuccessMessage("Déconnexion réussie !");

      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);

      return response;
    } catch (error) {
      console.error(
        "Erreur lors de l'appel à la méthode de déconnexion",
        error
      );
      setErrorMessage("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };
  return (
    <>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button
        type="submit"
        className="block px-4 py-2 text-sm text-gray-700"
        onClick={handleLogout}
      >
        Sign out
      </button>
    </>
  );
};

export default Logout;
