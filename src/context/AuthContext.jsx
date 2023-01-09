import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AUTH_INITIAL = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

const AuthContext = createContext(AUTH_INITIAL);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('authContext must be used within a AuthContextProvider');
  }

  return context;
};

const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export default function AuthContextProvider({ children }) {
  const [authState, dispatch] = useReducer(AuthReducer, AUTH_INITIAL);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authState.user));
    if (location.pathname === '/login' && authState.user) {
      navigate('/');
    }
  }, [authState.user, location.pathname, navigate]);

  const contextValue = useMemo(
    () => ({
      authState,
      dispatch,
    }),
    [authState, dispatch],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};

AuthContextProvider.defaultProps = {
  children: null,
};
