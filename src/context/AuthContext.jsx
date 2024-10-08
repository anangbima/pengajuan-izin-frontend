import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContent = createContext({
  user : null,
  setUser : () => {},
  csrfToken: () => {}
});

export const AuthProvider = ({children}) => {
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const setUser = (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }else{
      localStorage.removeItem('user');
    }

    _setUser(user);
  };

  const csrfToken = async () => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    return true;
  };

  return (
    <AuthContent.Provider value={{ user, setUser, csrfToken}}>
      {children}
    </AuthContent.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContent);
}