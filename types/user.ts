export interface UserCredentials {
  username: string
  passphrase: string
}

export interface User {
  name: string
  surname: string
  credentials: UserCredentials
  active: boolean
  created: string
  _comment?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  error: string | null
  loading: boolean
} 