import React from 'react'
import firebase from 'firebase/compat/app';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'
import { app } from '@/firebase/config';

const Login = () => {

    var uiConfig = {
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
          window.location.assign('<your-privacy-policy-url>');
        }
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth(app));
      // The start method will wait until the DOM is loaded.
      if (ui.isPendingRedirect()) {
        ui.start('#firebaseui-auth-container', uiConfig);
      }


  return (
  <>
    <h1>Welcome to My Awesome App</h1>
    <div id="firebaseui-auth-container"></div>
  </>
    
  )
}

export default Login