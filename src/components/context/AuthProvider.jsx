import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAthenticated: false,
      };
    default:
      throw new Error("Unknown action!");
  }
}
const initialState = {
  user: null,
  isAthenticated: false,
};

const FAKE_USER = {
  name: "Shaghayegh",
  email: "user@gmail.com",
  password: "1234",
};

function AuthProvider({ children }) {
  const [{ user, isAthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const login = (email, password) => {
    if (email.FAKE_USER === email && password.FAKE_USER === password)
      dispatch({ type: "login", payload: FAKE_USER });
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
