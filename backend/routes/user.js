const express = require('express')

const {
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

const {requireAuth, requireAdmin } = require('../middleware/requireAuth')

const router = express.Router()

// richiede l'autenticazione base per tutte le routes
router.use(requireAuth)

router.get('/', requireAdmin, getUsers)
router.get('/', requireAdmin, getUser)
router.delete('/', requireAdmin, deleteUser)
router.patch('/', requireAdmin, updateUser)

module.exports = router