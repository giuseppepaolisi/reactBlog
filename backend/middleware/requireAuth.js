const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// Carica la chiave privata per firmare il token
const privateKey = fs.readFileSync(path.join(__dirname, '../key/rsa.private'), 'utf8');

// Carica la chiave pubblica per verificare il token
const publicKey = fs.readFileSync(path.join(__dirname, '../key/rsa.public'), 'utf8');

// Funzione per generare un token JWT
const generateToken = (payload) => {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
};

//verifica se un utente è autenticato senza distinzione di type 
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Token richiesto' })
  }

  const token = authorization.split(' ')[1]

  try {
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

    // Includi il campo 'type' quando recuperi l'utente dal database
    const user = await User.findOne({ _id: payload._id }).select('_id type')

    if (!user) {
      throw new Error('Utente non trovato')
    }

    req.user = user // req.user contiene sia _id che type
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Richiesta non autorizzata' })
  }
};

//verifica se l'utente è un admin
const requireAdmin = (req, res, next) => {
    if (req.user && req.user.type === 'admin') {
      next() // L'utente è un admin, procedi alla prossima middleware o al controller
    } else {
      res.status(403).json({ error: 'Accesso riservato agli amministratori' })
    }
  };
  
  module.exports = { generateToken, requireAuth, requireAdmin }