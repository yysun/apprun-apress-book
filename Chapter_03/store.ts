import app from 'apprun';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const STORAGE_KEY = 'to-do-list';

const config = {
  apiKey: "AIzaSyAImbYY2eFb5TPcBlZn-iHaNhKtNJ8Seug",
  authDomain: "apprun-demo.firebaseapp.com",
  databaseURL: "https://apprun-demo.firebaseio.com",
  projectId: "apprun-demo",
  storageBucket: "apprun-demo.appspot.com",
  messagingSenderId: "1024119839929"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const ref = db.collection(STORAGE_KEY).doc("state")

app.on('save-state', state => ref.set(state));

ref.onSnapshot(doc => {
  if (doc.exists) app.run('new-state', doc.data())
});
