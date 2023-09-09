import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/analytics'
import 'firebase/functions'
import 'firebase/storage'

const clientCredentials = {}

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
    if ('measurementId' in clientCredentials) firebase.analytics()
  }
  firebase.firestore()
  firebase.database()
  firebase.functions()
} catch (err) {
  console.error({ message: err.message })
}
export const storage = firebase.storage()
export const db = firebase.firestore()
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
