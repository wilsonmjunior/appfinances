import React, { createContext, ReactNode, useContext, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import { Alert } from 'react-native'

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
  signInWithGoogle(): Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = "497049902499-hn1eai6td71ardr3affph58bf01n11g9.apps.googleusercontent.com"
      const REDIRECT_URI = "https://auth.expo.io/@wilsonmjuniorx/appgofinances"
      const RESPONSE_TYPE = "token"
      const SCOPE = encodeURI("profile email")

      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthResponse

      if (type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json()

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        })
      }
    } catch (error) {
      console.warn('error', error);
      Alert.alert('Não foi possivel conectar a conta Google')
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthContext, AuthProvider, useAuth }
