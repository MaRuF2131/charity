import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContext } from './mytools/context/context.jsx'
import useAuth from './mytools/firabase/useAuth.js'

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
        <App />
    </AuthProvider>
  </StrictMode>,
)

