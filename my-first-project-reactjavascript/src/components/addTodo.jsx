import React from "react";
import { useState } from "react";
import TodoService from "../services/Todo/Service";


export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const newTodo = {
            title,
            content,
            completed: false,
        };

        try {
            // Appel au service pour créer une nouvelle tâche
            const createdTodo = await TodoService.createTodo(newTodo);
            console.log("Tâche créée avec succès :", createdTodo);

            // Réinitialisation des champs et affichage du message de succès
            setTitle("");
            setContent("");
            setSubmitted(true);
        } catch (error) {
            console.error("Erreur lors de la création de la tâche :", error);
        }
    };

    // Fonction pour réinitialiser le formulaire après soumission
    const handleReset = () => {
        setTitle("");
        setContent("");
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Tâche ajoutée avec succès !</h4>
                    <button className="btn btn-success" onClick={handleReset}>
                        Ajouter une autre tâche
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} // Gestion de l'état
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)} // Gestion de l'état
                            name="content"
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        Soumettre
                    </button>
                </form>
            )}
        </div>
    );
}