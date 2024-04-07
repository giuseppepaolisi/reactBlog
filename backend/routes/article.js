const express = require('express')

const {
    getUserArticles,
    getArticles,
    getArticle,
    createArticle,
    deleteArticle,
    updateArticle
  } = require('../controllers/articleController')

  const {requireAuth, requireAdmin } = require('../middleware/requireAuth')

const router = express.Router()

// richiede l'autenticazione base per tutte le routes
router.use(requireAuth)

router.get('/user/:user', getUserArticles)
router.get('/', getArticles)
router.get('/:id', getArticle)
router.post('/', createArticle)
router.delete('/:id', deleteArticle)
router.patch('/:id', updateArticle)


module.exports = router