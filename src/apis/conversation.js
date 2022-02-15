import { post, get, put } from './rest'

export const getConversation = (groupId, conversationId) => get(
  `/conversations/${groupId}/${conversationId}?s=${0}&e=${10}`
)

export const addMessage = (groupId, conversationId, payload) => post(
  `/conversations/messages/${groupId}/${conversationId}`,
  payload
)