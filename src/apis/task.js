import { post, get } from './rest'

export const createTask = (groupId, processId, payload) => post(
  `/tasks/${groupId}/${processId}`,
  payload
)

