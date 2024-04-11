import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { login } from '../redux/auth/slice'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  //redux
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
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
        //login({ token: data.token, user: data.user })
        dispatch(login({ token: data.token, user: data.user }));
      } else {
        setError(data.error)
        throw new Error(data.error || 'Non è stato possibile effettuare il login')
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="" style={{width: "100%", maxWidth: "330px", padding: "15px", margin: "auto", textAlign: "center"}}  onSubmit={handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required autofocus />
        <label for="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  required />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        { error ? ( 
          <div className="alert alert-danger" style={{marginTop: "20px"}} role="alert">
            {error}
          </div> ) : (<div></div>
          )
        }
        <p className="mt-5 mb-3 text-muted">&copy; 2021-2024</p>
      </form>
    </div>
  )
}

export default Login