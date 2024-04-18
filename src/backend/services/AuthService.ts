import app from "../../configs/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, updatePassword, sendPasswordResetEmail, User, sendEmailVerification } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider, signInWithEmailAndPassword , signOut } from "firebase/auth";
// import UserModel from "../backend/Models/User";

interface IFunctionReturn {
  user?: User
  error?: any
  credential?: any
  shouldRefresh?: boolean
}

export const AuthService = {
  auth: getAuth(app),
  registerViaEmail: async (email: string, password: string): Promise<IFunctionReturn> => {
    try {
      const auth = getAuth(app);
      return await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // User Auth to Backend
        // let shouldRefresh = false;
        // await UserModel.findByEmail(String(user.email))
        // .then(async ([res]) => {
        //   if (!!res) {
        //     if (!res.uid) {
        //       res.uid = user.uid;
        //       await UserModel.update(String(res.id), res, {})
        //       shouldRefresh = true;
        //     }
        //   }
        // })
        // .catch(err => {console.error(err)})
        let cbUrl = process.env.REACT_APP_APP_URL
        let option = undefined;
        if (!!cbUrl) option = { url: `${cbUrl}/account/profile` }
        await sendEmailVerification(userCredential.user, option)
        return { user: user };
      })
      .catch((error) => {
        // const errorCode = error.code;
        return { error: error };
      });
    } catch (error) { return { error: error }; }
    // // try {
    //   const auth = getAuth(app);
    //   const { userCred, error } = await createUserWithEmailAndPassword(auth, email, password)
    //   .then(async (userCredential) => {
    //     // await RegisterBackend(userCred.user, email, first_name, last_name)
    //     return { userCred: userCredential };
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     return { error: error };
    //   });
    //   if (!error) {
    //     await sendEmailVerification(userCred.user, { url: `${process.env.NEXT_PUBLIC_APP_URL}` })
    //   }
    //   return { user: userCred?.user, error: error }
    //   // } catch (error) { return { error: error }; }
  },
  loginViaEmail: async (email: string, password: string): Promise<IFunctionReturn> => {
    try {
      const auth = getAuth();
      return await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // User Auth to Backend
          // let shouldRefresh = false;
          // await UserModel.findByEmail(String(user.email))
          // .then(async ([res]) => {
          //   if (!!res) {
          //     if (!res.uid && user.emailVerified) {
          //       res.uid = user.uid;
          //       await UserModel.update(String(res.id), res, {})
          //       shouldRefresh = true;
          //     }
          //   }
          // })
          // .catch(err => {console.error(err)})
          return { user: user }
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // console.log(error.message)
          return { error: error }
        });
    } catch (error) { return { error: error }; }
  },
  loginWithGoogle: async (): Promise<IFunctionReturn> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const auth = getAuth();
      auth.languageCode = 'id';
  
      return await signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        // User Auth to Backend
        // let shouldRefresh = false;
        // await UserModel.findByEmail(String(user.email))
        // .then(async ([res]) => {
        //   if (!!res) {
        //     if (!res.uid && user.emailVerified) {
        //       res.uid = user.uid;
        //       await UserModel.update(String(res.id), res, {})
        //       shouldRefresh = true;
        //     }
        //   }
        // })
        // .catch(err => {console.error(err)})
        return { credential: credential, user: user };
      }).catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return { credential: credential, error: error }
      });
    } catch (error) { return { error: error }; }
  },
  loginWithFacebook: async (): Promise<IFunctionReturn> => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      auth.languageCode = 'id';
      provider.setCustomParameters({
        'display': 'popup'
      });
      return await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const user = result.user;
        // const accessToken = credential.accessToken;
        return { credential: credential, user: user }
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        return { credential: credential, error: error }
      });
    } catch (error) { return { error: error }; }
  },
  resetPassword: async (email: string, callbackUrl?: string) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email, { url: callbackUrl??`${process.env.NEXT_PUBLIC_APP_URL}` })
    } catch (error) { return { error: error }; }
  },
  logout: async () => {
    try {
      const auth = getAuth(app);
      return await signOut(auth)
      // .then(() => {
      //   return { user: null }
      // }).catch((error) => {
      //   return { error: error }
      // });
    } catch (error) { return { error: error }; }
  },
  deleteAccount: async () => {
    try {
      const auth = getAuth(app);
      await auth?.currentUser?.delete();
    } catch (error) { return { error: error }; }
  },
  updateUserPassword: async (newPassword: string) => {
    try {
      const auth = getAuth(app);
      if (auth.currentUser) await updatePassword(auth.currentUser, newPassword);
      else throw new Error("User not found!");
    } catch (error) { return { error: error }; }
  }
}