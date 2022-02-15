import * as React from 'react'
import io from 'socket.io-client'
import { SOCKET_SERVER } from '../config/Constance'

export const socket = io(`${SOCKET_SERVER}`)

socket.on('connect', () => {
  console.log('Socket connected, id = ', socket.id)
})

const SocketContext = React.createContext()

export const ProvideSocket = ({ children }) => {
  return (
    <SocketContext.Provider value={ { socket: socket } }>
      { children }
    </SocketContext.Provider>
  )
}
export const SocketProvider = SocketContext.Provider
export const SocketConsumer = SocketContext.Consumer

export default SocketContext