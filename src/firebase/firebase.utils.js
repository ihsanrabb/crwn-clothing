import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyC5qETYnxdq_e6XfTgnMc1HxKVM3KQt0DI",
  authDomain: "crwn-clothing-db-bfeb5.firebaseapp.com",
  projectId: "crwn-clothing-db-bfeb5",
  storageBucket: "crwn-clothing-db-bfeb5.appspot.com",
  messagingSenderId: "712307425265",
  appId: "1:712307425265:web:8bbc5f130ee7e1ac65ce50",
  measurementId: "G-Y79FLR1ER8"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({promp: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase