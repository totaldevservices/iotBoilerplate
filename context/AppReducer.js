/**
 * AppReducer specifies the application state changes in response to certain actions to our context
 */

export default (state, action) => {
  switch (action.type) {
    case 'CONNECT_TO_SBC_DEVICE':
      return {
        // We have to create a new State Object and send it
        // Therefore, we'll use the JavaScript Spread Operator property (...) on the current state (...state)
        // and finally send the new state (old state + new state)
        ...state,
        // change the 'isDeviceConnected' value from false to true
        isDeviceConnected: true,
      };

    case 'DISCONNECT_TO_SBC_DEVICE':
      return {
        ...state,
        // change the 'isDeviceConnected' value from true to false
        isDeviceConnected: false,
      };

    default:
      return state;
  }
};
