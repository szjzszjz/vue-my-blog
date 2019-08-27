import NotificationBar from './NotificationBar'
import notify from './function'

export default (Vue) => {
  Vue.component(NotificationBar.name, NotificationBar)
  Vue.prototype.$notify = notify
}
