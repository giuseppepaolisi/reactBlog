const express = require('express')

const {
    getUserArticles,
    getArticles,
    getArticle,
    createArticle,
    deleteArticle,
    updateArticle
  } = require('../controller/articleController')

const router = express.Router()

router.get('/user/:user', getUserArticles)
router.get('/', getArticles)
router.get('/:id', getArticle)
router.post('/', createArticle)
router.delete('/:id', deleteArticle)
router.patch('/:id', updateArticle)


module.exports = router