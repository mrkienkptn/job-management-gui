import { post, get, put, del } from './rest'

export const createProcess = (groupId, payload) => post(
  `/process/${groupId}`,
  payload
)
export const removeProcess = (groupId, processId) => del(
  `/process/actions/${groupId}/${processId}`
)
export const editProcess = (groupId, processId, payload) => put(
  `/process/actions/${groupId}/${processId}`,
  payload
)
export const dragTask = (groupId, payload) => put(
  `/process/tasks-dragging/${groupId}`,
  payload
)
