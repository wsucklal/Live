// Import the functions you need from the SDKs you need
import firebase from  'firebase/compat/app'
import {getFirestore} from '@firebase/firestore'
import {getStorage} from '@firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const app =firebase.initializeApp ({
  apiKey: "AIzaSyDiK8PKFgMNHlz-wHHyDlmBiY-_EcTmhDo",
  authDomain: "live-2024.firebaseapp.com",
  projectId: "live-2024",
  storageBucket: "live-2024.appspot.com",
  messagingSenderId: "1025148808085",
  appId: "1:1025148808085:web:7b5f6cf5e1ec5dd7e3e49c",
})
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
  