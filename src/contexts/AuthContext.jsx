import { createContext, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
