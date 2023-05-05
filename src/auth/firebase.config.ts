import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB3UP0zskAilBZJOpeLhu1Vqgi7L7X4EZ0',
  authDomain: 'graphiql-a40cb.firebaseapp.com',
  projectId: 'graphiql-a40cb',
  storageBucket: 'graphiql-a40cb.appspot.com',
  messagingSenderId: '899257582291',
  appId: '1:899257582291:web:28fdabe89c025fa6228a26',
  measurementId: 'G-XM5ZQV7QXS',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
