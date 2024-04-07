const Article = require('../models/article')
const mongoose = require('mongoose')

// get all user articles
const getUserArticles = async (req, res) => {
    const { user } = req.params
  
    const articles = await Article.find({user: user}).sort({createdAt: -1})
  
    res.status(200).json(articles)
  }

// get all articles
const getArticles = async (req, res) => {
  
    const articles = await Article.find({}).sort({createdAt: -1})
  
    res.status(200).json(articles)
  }
  
  // get a single articles
  const getArticle = async (req, res) => {
    const { id } = req.params
  
    //controlla se l'id dell'articolo è valido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Articolo non trovato'})
    }
  
    const article = await Article.findById(id)
  
    if (!article) {
      return res.status(404).json({error: 'Articolo non trovato'})
    }
    
    res.status(200).json(article)
  }
  
  
  // create new article
  const createArticle = async (req, res) => {
    const {title, body, user} = req.body
  
    let emptyFields = []
  
    if(!title) {
      emptyFields.push('title')
    }
    if(!body) {
      emptyFields.push('body')
    }
    if(!user) {
      emptyFields.push('user')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Campi non riempiti', emptyFields })
    }
  
    // add doc to db
    try {
      const article = await Article.create({title, body, user})
      res.status(200).json(article)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  // delete a article
  const deleteArticle = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Nessun articolo trovato'})
    }
  
    const article = await Article.findOneAndDelete({_id: id})
  
    if (!article) {
      return res.status(400).json({error: 'Nessun articolo trovato'})
    }
  
    res.status(200).json(article)
  }
  
  // update an article
  const updateArticle = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Nessun articolo trovato'})
    }
  
    const article = await Article.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!article) {
      return res.status(400).json({error: 'Nessun articolo trovato'})
    }
  
    res.status(200).json(article)
  }
  
  
  module.exports = {
    getUserArticles,
    getArticles,
    getArticle,
    createArticle,
    deleteArticle,
    updateArticle
  }