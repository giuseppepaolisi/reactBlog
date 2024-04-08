import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json()
      if (response.ok) {
        console.log('Login effettuato con successo', data)
        login({ token: data.token, user: data.user })
      } else {
        throw new Error(data.error || 'Non è stato possibile effettuare il login')
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login