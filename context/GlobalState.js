/**
 * This file is for Global State. We will be able to access the state throughout
 * the whole application by using React's Conext API
 */
import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

/**
 * Initial State
 */
const initialState = {
  isConnected: false,
};

/**
 * Create context
 * Context provides a way to pass data through the component tree
 * without having to pass props down manually at every level
 */
export const GlobalContext = createContext(initialState);

/**
 * Create provider
 * The provided allows other components to have access to the global state and dispatch action throughout the application
 */
export const GlobalProvider = ({children}) => {
  // useReducer needs access to the state and dispatch will be called whenever we call a dispatch action
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // children will be any component that will be wrapped in App.js
  // ie: TabNavigator component
  return (
    <GlobalContext.Provider
      value={{
        isConnected: state.isConnected,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
