import { createContext, useContext, useState, useEffect, Fragment } from 'react'
import { onAuthStateChanged, User } from '@firebase/auth'
// import Backdrop from '@mui/material/Backdrop'

import CircularProgress from '@mui/material/CircularProgress'
import { AuthService } from '../backend/services/AuthService'

// import UserBe from '../backend/Models/User'

interface IAuthContext {
  auth: any
  userNow: User
  // userNowBe: UserBe
  authError: any
  authCreds: any
  RegisterEmail: any
  LoginEmail: any
  LoginGoogle: any
  LoginFacebook: any
  ResetPassword: (email: string, callbackUrl?: string) => Promise<{ error: unknown } | undefined>
  Logout: any
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider = (props: any) => {
  const auth = AuthService.auth
  // console.log(auth)
  const [userNow, setuserNow] = useState<User | null>(auth.currentUser)
  // const [userNowBe, setuserNowBe] = useState<UserBe | null>(null)
  const [authError, setauthError] = useState(null)
  const [authCreds, setauthCreds] = useState(null)
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      // console.warn('onauthstatechange')
      if (user) {
        setuserNow(user)
        // await UserBe.findByUid(user.uid).then(([res]) => {
        //   setuserNowBe(res ?? null)
        // })
      } else {
        setuserNow(null)
        // setuserNowBe(null)
      }
      setisLoading(false)
    })

    return unsubscribe
  }, [auth])

  // useEffect(() => {
  //   if (!!userNow && userNow.emailVerified) {
  //     const revalidateUserBe = async () => {
  //       await UserBe.findByEmail(String(userNow.email))
  //         .then(async ([res]) => {
  //           if (!!res) {
  //             if (!res.uid) {
  //               res.uid = userNow.uid
  //               await UserBe.update(String(res.id), res, {})
  //             }
  //           }
  //         })
  //         .catch(err => {
  //           console.error(err)
  //         })
  //     }

  //     revalidateUserBe()
  //   }
  // }, [userNow, userNowBe])

  const RegisterEmail = async (email: string, password: string) => {
    const { user, error, credential, shouldRefresh } = await AuthService.registerViaEmail(email, password)
    setuserNow(user ?? null)
    setauthError(error ?? null)
    setauthCreds(credential ?? null)
    return { user: user, credential: credential, error: error, shouldRefresh }
  }
  const LoginEmail = async (email: string, password: string) => {
    const { user, error, credential, shouldRefresh } = await AuthService.loginViaEmail(email, password)
    setuserNow(user ?? null)
    setauthError(error ?? null)
    setauthCreds(credential ?? null)
    return { user: user, credential: credential, error: error, shouldRefresh }
  }
  const LoginGoogle = async () => {
    const { user, error, credential, shouldRefresh } = await AuthService.loginWithGoogle()
    // console.warn(result)
    // setuserNow(result.user)
    setuserNow(user ?? null)
    setauthError(error ?? null)
    setauthCreds(credential ?? null)
    return { user: user, credential: credential, error: error, shouldRefresh }
  }
  const LoginFacebook = async () => {
    const { user, error, credential } = await AuthService.loginWithFacebook()
    setuserNow(user ?? null)
    setauthError(error ?? null)
    setauthCreds(credential ?? null)
    return { user: user, credential: credential, error: error }
  }
  const ResetPassword = async (email: string, callbackUrl?: string) => {
    return await AuthService.resetPassword(email, callbackUrl)
  }
  const Logout = async () => {
    return await AuthService.logout()
  }

  const value = {
    auth,
    userNow,
    // userNowBe,
    authError,
    authCreds,
    RegisterEmail,
    LoginEmail,
    LoginGoogle,
    LoginFacebook,
    ResetPassword,
    Logout
  }

  if (isLoading)
    return (
      <Fragment>
        {/* <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} open> */}
          <CircularProgress color='primary' />
        {/* </Backdrop> */}
      </Fragment>
    )

  return <AuthContext.Provider value={value} {...props} />
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
