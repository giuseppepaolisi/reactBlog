import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext deve essere utilizzato all\'interno di un AuthContextProvider')
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, email: null });

  useEffect(() => {
    const data = localStorage.getItem('authData');
    if (data) {
      setAuth(JSON.parse(data));
    }
  }, []);

  const login = (data) => {
    setAuth(data);
    localStorage.setItem('authData', JSON.stringify(data));
  };

  const logout = () => {
    setAuth({ token: null, email: null });
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
