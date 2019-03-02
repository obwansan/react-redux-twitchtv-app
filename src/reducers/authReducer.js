const INITIAL_STATE = {
  isSignedIn: null
};

// A reducer function
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SIGN_IN':
      // returns a new object with all the properties of the state argument
      // passed in, and sets state.isSignedIn to true.
      return { ...state, isSignedIn: true };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};