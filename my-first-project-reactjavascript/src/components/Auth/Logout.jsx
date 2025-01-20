import React, { useState } from "react";
import api from "../../axios/http-common";
const Logout = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem('token');
  console.log("Token avant de se déconnecter :", token);


  
  const handleLogout = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    console.log("Cliquez pour se déconnecter");

    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token is null or not found");
        setErrorMessage("Vous devez être connecté pour vous déconnecter.");
        return; 
    }

    try {
        const response = await api.post("/auth/logout", {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                 "Access-Control-Origin": "*"
            },
        });

      
        localStorage.removeItem('token');
        
       
        setSuccessMessage("Déconnexion réussie !");
        
        
        setTimeout(() => {
            window.location.replace("/login");
          }, 3000);
        
        return response.data; 

    } catch (error) {
        console.error("Erreur lors de l'appel à la méthode de déconnexion", error);
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
