import { post, get, put } from './rest'

export const createGroup = (payload) => post(
  '/groups',
  payload
)
export const getGroups = (payload) => get(
  '/groups'
)
export const getGroup = (groupId) => get(
  `groups/${groupId}`
)
export const dragProcess = (groupId, payload) => put(
  `groups/processes-dragging/${groupId}`,
  payload
)
