import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {

  const { auth, logout } = useAuth();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Blog</h1>
        </Link>
        <nav>
          {auth.token ? (
            <div>
              <span>{auth.email}</span>
              <button onClick={logout}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          <Link to="/articles">Articoli</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar