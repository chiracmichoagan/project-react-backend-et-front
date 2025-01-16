import React, { useState } from "react";
import TodoService from "../services/Todo/Service";

export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Vérifie que les champs ne sont pas vides
        if (!title || !content) {
            console.error("Le titre et le contenu sont requis !");
            return;
        }

        const newTodo = {
            id: Math.floor(Math.random() * 1000), // Génère un ID aléatoire
            title,
            content,
            // completed: false, // Assurez-vous que ce champ est attendu par l'API
        };

        try {
            // Appel au service pour créer une nouvelle tâche
            const createdTodo = await TodoService.createTodo(newTodo);
            console.log("Tâche créée avec succès :", createdTodo.data); // Vérifie la réponse

            // Réinitialisation des champs et affichage du message de succès
            setTitle("");
            setContent("");
            setSubmitted(true);
        } catch (error) {
            console.error("Erreur lors de la création de la tâche :", error.response ? error.response.data : error.message);
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
                    <h4 className="bold">Tâche ajoutée avec succès !</h4>
                    <button className="btn btn-success" onClick={handleReset}>
                        Ajouter une autre tâche
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-full rounded shadow-2xl max-w-lg mx-auto mt-5">
                    <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
                        <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Formulaire d'ajout des tâches</h2>
                        <p className="mb-5 leading-relaxed text-gray-600">Lorem, ipsum dolor suri odio obcaecati.</p>
                        <div className="mb-4">
                            <label htmlFor="title" className="text-sm leading-7 text-gray-600">Titre</label>
                            <input type="text" id="title" name="title" className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="text-sm leading-7 text-gray-600">Description</label>
                            <textarea id="content" name="content" className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">Envoyer</button>
                        <p className="mt-3 text-xs text-gray-500">Lorem ipsum s maiores repudiandae doloremque autem?</p>
                    </div>
                </form>
            )}
        </div >
    );
}