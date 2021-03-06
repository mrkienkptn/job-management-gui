import { get, post } from './rest'

export const login = (payload) => post(
  '/login',
  payload
)
export const signup = (payload) => post(
  '/signup',
  payload
)
export const getUsers = email => get(
  `/users?email=${email}`
)
