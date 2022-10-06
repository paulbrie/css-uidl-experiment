import { initializeApp, FirebaseApp } from 'firebase/app';
import store from '../../store';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  Auth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyByJkpQkT4hp1wYgEv7K7wDlialRoNn5c0',
  authDomain: 'css-experiment.firebaseapp.com',
  projectId: 'css-experiment',
  storageBucket: 'css-experiment.appspot.com',
  messagingSenderId: '962563251449',
  appId: '1:962563251449:web:083a07d44730ffda055628',
};

const provider = new GoogleAuthProvider();

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export const init = () => {
  if (app) {
    return;
  }

  app = initializeApp(firebaseConfig);
  auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    store.user.next(user);
    user?.getIdToken(true).then((token) => {
      store.userToken.next(token);
    });
  });
};

export const signIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // @ts-ignore
      auth.currentUser
        ?.getIdToken()
        .then((token) => store.userToken.next(token))
        .catch(console.error);
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const logOut = () => {
  store.user.next(null);
  store.userToken.next('');
  auth.signOut();
};
