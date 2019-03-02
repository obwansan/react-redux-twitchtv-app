import React from 'react';
import { connect } from 'react-redux';
// Don't need to put the file name on the path end if the folder contains just one file called index.js
import { signIn, signOut } from '../actions';

// Wiring up the Google API library
class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      // init() performs an asynchronous network request to google's api server to initilaize our client.
      // init() returns a promise that tells us when the client library has been successfully initialized.
      window.gapi.client.init({
        clientId: '932843054106-v4oavsjhupt4n3vo3m6gobm026cu91ji.apps.googleusercontent.com',
        scope: 'email'
        // The callback passed to the .then is automatically invoked after the client library 
        // has been successfully initialized and the gapi libary is ready to go.
      }).then(() => {
        // Get a reference to the 'auth' object after it is initialized
        this.auth = window.gapi.auth2.getAuthInstance();
        // Update our Auth state in our redux store
        this.onAuthChange(this.auth.isSignedIn.get());
        // Listen for changes in the current user's sign-in state.
        // GAPI docs: listen() passes true to this function when the user signs in, 
        // and false when the user signs out.
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // Call the appropriate action creator any time our Auth state changes, according to our gapi library
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      // When we call the action creator, pass in the ID of the user who has signed in.
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    // Print their authentication status on the screen
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
   }
}

const actionCreators = {
  signIn,
  signOut
}

// HOW ARE THE SIGNIN AND SIGNOUT ACTION CREATORS MADE AVAILABLE ON THE PROPS OBJECT?
// React-Redux docs: "The return of the mapDispatchToProps function will be merged to your connected 
// component as props. You may call them directly to dispatch its action."

// The mapDispatchToProps function returns a plain object containing keys that will become separate 
// props for your own component. The key's values are functions that dispatch an action when called.

// When defining mapDispatchToProps as an object rather than as a function, as we do here,
// it works the same way, except that the dispatching happens magically/implicitly rather than 
// programmatically (i.e. don't have to code it out).
export default connect(mapStateToProps, actionCreators)(GoogleAuth);