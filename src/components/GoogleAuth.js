import React from 'react';

// Wiring up the Google API library
class GoogleAuth extends React.Component {
componentDidMount() {
  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
      clientId: '932843054106-v4oavsjhupt4n3vo3m6gobm026cu91ji.apps.googleusercontent.com',
      scope: 'email'
    });
  });
}

  render() {
    return <div>GoogleAuth</div>
  }
}

export default GoogleAuth;