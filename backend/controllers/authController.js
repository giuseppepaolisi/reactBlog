const User = require('../models/user')
const { generateToken } = require('../middleware/requireAuth')

// login di un utente
const loginUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // creazione token
      const token = generateToken({_id : user._id})
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  // registrazione di un utente base
  const signupUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.signup(email, password)
  
      // create a token
      const token = generateToken({_id : user._id})
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  module.exports = { signupUser, loginUser }