import './Notification.css'

const Notification = ({ message, status }) => {
  if (!message) return null

  return (
    <div className={`message ${status}`}>
      {message}
    </div>
  )
}

export default Notification