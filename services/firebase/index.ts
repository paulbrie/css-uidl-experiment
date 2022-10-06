import { initializeApp } from 'firebase/app';
import store from '../../store';

const firebaseConfig = {
  apiKey: 'AIzaSyByJkpQkT4hp1wYgEv7K7wDlialRoNn5c0',
  authDomain: 'css-experiment.firebaseapp.com',
  projectId: 'css-experiment',
  storageBucket: 'css-experiment.appspot.com',
  messagingSenderId: '962563251449',
  appId: '1:962563251449:web:083a07d44730ffda055628',
};

export default function withFirebase(store) {
  const app = initializeApp(firebaseConfig);
  store.firebase.instance.next(app);
  console.log('...', app);
}
