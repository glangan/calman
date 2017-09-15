import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBjnLLxRseC-ajzJDg7W93TZhZzHaasKYU",
  authDomain: "calman-5c08b.firebaseapp.com",
  databaseURL: "https://calman-5c08b.firebaseio.com",
  projectId: "calman-5c08b",
  storageBucket: "",
  messagingSenderId: "1067254938972"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;