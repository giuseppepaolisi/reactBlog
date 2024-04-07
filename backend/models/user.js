const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email è richiesta'],
    unique: true,
    validate: [validator.isEmail, 'Inserire un\'email valida'] // Usa la funzione di validazione direttamente nello schema
  },
  password: {
    type: String,
    required: [true, 'Password è richiesta'],
    minlength: [8, 'La password deve avere almeno 8 caratteri']
  },
  type: {
    type: String,
    required: true,
    default: 'user'
  }
});

// Metodo statico di registrazione
userSchema.statics.signup = async function(email, password) {

  if (password.length < 8) {
    throw Error('La password deve avere almeno 8 caratteri');
  }
  
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email già utilizzata')
  }

  const salt = await bcrypt.genSalt(10); // Genera una stringa casuale
  const hash = await bcrypt.hash(password, salt) // Combina la stringa casuale con la password

  const user = await this.create({ email, password: hash })

  return user;
};

// Metodo statico di login
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Email non trovata')
  }

  // Verifica delle password
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Password errata')
  }

  return user
};

module.exports = mongoose.model('User', userSchema)