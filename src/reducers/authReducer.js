import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

// A reducer function
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      // Returns a new object with all the properties of the state argument 
      // (i.e. INITIAL_STATE) passed in. Sets isSignedIn to true.
      return { 
        ...state, 
        isSignedIn: true,
        userId: action.payload 
      };
    case SIGN_OUT:
      return { 
        ...state, 
        isSignedIn: false,
        userId: null
      };
    default:
      return state;
  }
};