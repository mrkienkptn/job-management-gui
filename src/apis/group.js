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
export const addMember = (groupId, memberId) => put(
  `groups/members/add/${groupId}`,
  { memberId }
)
export const removeMember = (groupId, memberId) => put(
  `groups/members/remove/${groupId}`,
  { memberId }
)
