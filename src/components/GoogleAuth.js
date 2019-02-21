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
    });
  });
}

renderAuthButton() {
  if (this.state.isSignedIn === null) {
    return <div>I don't know if we are signed in</div>
  } else if (this.state.isSignedIn) {
    return <div>I am signed in!</div>
  } else {
    return <div>I am not signed in</div>
  }
}

render() {
  // Print their authentication status on the screen
  return <div>{this.renderAuthButton()}</div>
}
}

export default GoogleAuth;