import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {

  const { auth, logout } = useAuth();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Blog
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/articles">Articoli</Link>
              </li>
            </ul>
            {auth.token ? (
              <div className="d-flex">
                <span className="navbar-text me-3">{auth.user.email}</span>
                <button className="btn btn-outline-danger" onClick={logout}>Log out</button>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                <Link className="btn btn-primary" to="/signup">Signup</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar