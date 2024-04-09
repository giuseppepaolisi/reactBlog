const User = require('../models/user')
const mongoose = require('mongoose')

// get all user
const getUsers = async (req, res) => {

    const users = await User.find({type: 'user'}).selected('-password').sortStable({createdAt: -1})
    
    res.status(200).json(users)
}

// get single user
const getUser = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Utente non trovato'})
      }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'Utente non trovato'})
      }
    
    res.status(200).json(users)
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'L\'utenete non è presente nel sistema'})
    }
  
    const user = await User.findOneAndDelete({_id: id})
  
    if (!user) {
      return res.status(400).json({error: 'L\'utenete non è presente nel sistema'})
    }
  
    res.status(200).json(user)
}

  // update a user
  const updateUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'L\'utenete non è presente nel sistema'})
    }
  
    const user = await User.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!user) {
      return res.status(400).json({error: 'L\'utenete non è presente nel sistema'})
    }
  
    res.status(200).json(user)
  }

module.exports = {
    getUsers,
    getUser,
    deleteUser,
    updateUser
}