import { useNotificationValue } from "../reducers/NotificationReducer"

const Notification = () => {
  const notification = useNotificationValue()

  return (
    <div className={notification?.status}>
      {notification?.message}
    </div>
  );
};

export default Notification;
