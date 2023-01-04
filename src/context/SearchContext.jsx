import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useReducer } from 'react';

const SEARCH_INITIAL = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

const SearchContext = createContext(SEARCH_INITIAL);

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearchContext must be used within a SearchContextProvider');
  }

  return context;
};

const SearchReducer = (state, { type, payload }) => {
  switch (type) {
    case 'NEW_SEARCH':
      return payload;
    case 'RESET_SEARCH':
      return SEARCH_INITIAL;
    default:
      return state;
  }
};

export default function SearchContextProvider({ children }) {
  const [searchState, dispatch] = useReducer(SearchReducer, SEARCH_INITIAL);

  const contextValue = useMemo(
    () => ({
      searchState,
      dispatch,
    }),
    [searchState, dispatch],
  );
  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}

SearchContextProvider.propTypes = {
  children: PropTypes.element,
};

SearchContextProvider.defaultProps = {
  children: null,
};
