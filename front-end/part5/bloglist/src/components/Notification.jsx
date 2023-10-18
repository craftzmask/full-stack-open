import './Notification.css'

import { selectNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, status } = useSelector(selectNotification)

  if (!message) return null

  return (
    <div className={`message ${status}`}>
      {message}
    </div>
  )
}

export default Notification