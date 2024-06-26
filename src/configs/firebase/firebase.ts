import { initializeApp, getApp, getApps, FirebaseApp, FirebaseOptions } from 'firebase/app'
import { FirebaseStorage, getStorage } from 'firebase/storage'
// import { getAnalytics } from "firebase/analytics";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

var app: FirebaseApp

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ?? undefined
}
// console.log(firebaseConfig)

if (getApps().length) {
  app = getApp()
} else {
  app = initializeApp(firebaseConfig)
  // if (typeof window !== 'undefined') {
  //   if ("measurementId" in firebaseConfig) {
  //     const analytics = getAnalytics(app);
  //   }
  // }
  // const appCheck = initializeAppCheck(app, {
  //   // provider: new ReCaptchaV3Provider(process.env.REACT_APP_SECRET ?? "gktnazarethpondokindahappsecret"),
  //   provider: new ReCaptchaV3Provider("arielsukamakannasigoreng"),
  //   isTokenAutoRefreshEnabled: true,
  // })
}

export const storage: FirebaseStorage = getStorage(app)

export default app
