import * as firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: 'AIzaSyAw-jv35IFQVWYniOGvADPgzhkzz7NDXUQ',
  authDomain: 'inqwire-8b669.firebaseapp.com',
  databaseURL: 'https://inqwire-8b669.firebaseio.com',
  projectId: 'inqwire-8b669',
  storageBucket: 'inqwire-8b669.appspot.com',
  messagingSenderId: '1084283745977',
};
const fire = firebase.initializeApp(config);

export default fire;
