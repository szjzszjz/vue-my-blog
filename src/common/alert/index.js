import AlertView from './AlertView'
import alert from './function'

export default (Vue) => {
  Vue.component(AlertView.name, AlertView)
  Vue.prototype.$alert = alert
}
