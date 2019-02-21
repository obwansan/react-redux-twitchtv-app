import React from 'react';

// Wiring up the Google API library
class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

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
      // Figure out if the user is currently signed in
      this.setState({ isSignedIn: this.auth.isSignedIn.get()} );
      this.auth.isSignedIn.listen(this.onAuthChange);
    });
  });
}

onAuthChange = () => {
  this.setState({ isSignedIn: this.auth.isSignedIn.get() });
};

onSignIn = () => {
  this.auth.signIn();
};

onSignOut = () => {
  this.auth.signOut();
};

renderAuthButton() {
  if (this.state.isSignedIn === null) {
    return null;
  } else if (this.state.isSignedIn) {
    return (
      <button onClick={this.onSignOut} className="ui red google button">
        <i className="google icon" />
        Sign Out
      </button>
    )
  } else {
    return (
      <button onClick={this.onSignIn} className="ui red google button">
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

export default GoogleAuth;