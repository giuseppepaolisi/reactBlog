import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';

import { useSelector } from 'react-redux'

// pages
import Signup from './pages/Signup'
import Login from './pages/Login'
import ListArticles from './pages/ListArticles'

function App() {

  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={!auth.token ? <Login /> : <Navigate to="/articles" />} />
          <Route path="/signup" element={!auth.token ? <Signup /> : <Navigate to="/articles" />} />
          <Route path="/articles" element={auth.token ? <ListArticles /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
