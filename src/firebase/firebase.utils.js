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

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(err) {
      console.log(`error creating user`, err.message)
    }
  }
  return userRef
}

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  
  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({promp: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase