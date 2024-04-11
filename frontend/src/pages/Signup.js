import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { login } from '../redux/auth/slice'

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //redux
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Utente registrato con successo', data);
        dispatch(login({ token: data.token, user: data.user }));
      } else {
        throw new Error(data.error || 'Non è stato possibile registrare l\'utente');
      }
    } catch (error) {
      console.error(error);
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
      <button type="submit">Registrati</button>
    </form>
  );
}

export default Signup;
