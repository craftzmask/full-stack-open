import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
  const [notification, dispatch] = useReducer(NotificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1]
}

export default NotificationContext