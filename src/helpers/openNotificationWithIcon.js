/* Function to show notification  */

export const openNotificationWithIcon = (notification, type, message, description) => {
  notification[type]({
    message: message,
    description: description
  })
}
