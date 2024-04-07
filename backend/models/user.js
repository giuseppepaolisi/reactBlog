const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'user'
  }
})

// metodo si registrazione statico
userSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('Tutti i campi sono vuoti')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email invelida')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password debole')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email già utilizzata')
  }

  const salt = await bcrypt.genSalt(10) //genera una stringa casuale che sarà combinata con la password
  const hash = await bcrypt.hash(password, salt) //combina l stringa casuale con la password

  const user = await this.create({ email, password: hash })

  return user
}

// metodo statico di login
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('Tutti i campi sono vuoti')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Email errata')
  }

  // match delle password
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Password errata')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)