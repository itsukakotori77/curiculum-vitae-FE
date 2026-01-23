export interface ILogin {
  email: string
  password: string
}

export interface IUser {
  id: number 
  email: string 
  username: string
}

export interface IAuth {
  token: string | null
  user: IUser | null 
  isAuthenticated: boolean 
  checkAuth: () => Promise<void>
  setAuth: (token: string, user: IUser) => void 
  logout: () => void 
  validateAuth: () => Promise<void>
}
