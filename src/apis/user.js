import { post } from './rest'

export const login = (payload) => post(
  '/login',
  payload
)
export const signup = (payload) => post(
  '/signup',
  payload
)
