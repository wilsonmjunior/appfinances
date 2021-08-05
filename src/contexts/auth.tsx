import React, { createContext, ReactNode, useEffect, useContext, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as AuthSession from 'expo-auth-session'
import * as AppleAuthentication from 'expo-apple-authentication'

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface AuthResponse {
  params: {
    access_token: string
  }
  type: string
}

interface AuthContextData {
  user: User
  userStorageLoading: boolean
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
  signOut(): Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  const signInWithGoogle = useCallback(async () => {
    try {
      const RESPONSE_TYPE = "token"
      const SCOPE = encodeURI("profile email")

      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthResponse

      if (type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json()

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        }

        setUser(userLogged)
        await AsyncStorage.setItem('@GoFinances:user', JSON.stringify(userLogged))
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  const signInWithApple = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ]
      })

      if (credential) {
        const name = credential.fullName?.givenName
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`

        const userLogged = {
          id: String(credential.user),
          email: credential.email,
          name,
          photo,
        } as User

        setUser(userLogged)
        await AsyncStorage.setItem('@GoFinances:user', JSON.stringify(userLogged))
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  const signOut = useCallback(async () => {
    setUser({} as User)
    await AsyncStorage.clear()
  }, [])

  useEffect(() => {
    async function loadUserStorage() {
      const userStorage = await AsyncStorage.getItem('@GoFinances:user')
      if (userStorage) {
        const userData = JSON.parse(userStorage) as User
        setUser(userData)
      }

      setUserStorageLoading(false)
    }

    if (!user.id) {
      loadUserStorage()
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, userStorageLoading, signInWithGoogle, signInWithApple, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthContext, AuthProvider, useAuth }
