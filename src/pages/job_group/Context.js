import * as React from 'react'

const JobGroupContext = React.createContext({})
export const JobGroupProvider = JobGroupContext.Provider
export const JobGroupConsumer = JobGroupContext.Consumer

export default JobGroupContext