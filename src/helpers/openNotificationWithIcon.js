import { notification } from 'antd'

/* Function to show notification  */
export const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description
  })
}
