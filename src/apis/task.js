import { post, get, put, del } from './rest'

export const createTask = (groupId, processId, payload) => post(
  `/tasks/${groupId}/${processId}`,
  payload
)

export const getTask = (groupId, taskId) => get(
  `/tasks/details/${groupId}/${taskId}/`
)
export const updateTask = (groupId, taskId, data) => put(
  `/tasks/details/${groupId}/${taskId}/`,
  data
)
export const addAssignee = (groupId, taskId, userId) => put(
  `/tasks/assignees/${groupId}/${taskId}`,
  { userId }
)
export const removeAssignee = (groupId, taskId, userId) => put(
  `/tasks/assignees/remove/${groupId}/${taskId}`,
  { userId }
)

export const addFollower = (groupId, taskId, userId) => put(
  `/tasks/followers/${groupId}/${taskId}`,
  { userId }
)
export const removeFollower = (groupId, taskId, userId) => put(
  `/tasks/followers/remove/${groupId}/${taskId}`,
  { userId }
)
