import React, { useEffect, useState } from 'react'

import Article from '../components/Article'

const ListArticles = () => {

    const [articles, setArticles] = useState([]); // Aggiunta dello stato per gli articoli

    const fetchArticles = async () => {
        const response = await fetch('/api/articles')
        let json = await response.json()
        json = json.filter( (element) => {
            return element.published === true
        })
        if(response.ok) {
            setArticles(json); // Aggiorna lo stato con gli articoli ricevuti
        }
    };

    //eliminazione articolo
    const deleteArticle = async (id) => {
        try {
            const response = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Errore nell\'eliminazione dell\'articolo');
            }
            // Rimuove l'articolo dall'array di articoli nello stato
            setArticles(articles.filter(article => article._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchArticles(); // Richiama l'API all'avvio del componente
    }, []); // L'array vuoto indica che useEffect verrà eseguito solo una volta dopo il primo render

    return (
        <div className="container-fluid">
            {articles.map((article) => (
                <Article key={article._id} article={article} onDelete={deleteArticle} /> // Usa un identificatore univoco come key
            ))}
        </div>
    )
}

export default ListArticles;