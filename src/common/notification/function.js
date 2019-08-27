import Vue from 'vue'
import NotificationBar from './NotificationBar'

const NotificationConstructor = Vue.extend(NotificationBar)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const index = instances.findIndex(inst => inst.id === instance.id)
  instances.splice(index, 1)

  const len = instances.length
  console.log('len--' + len)
  if (len < 1) return
  const removeHeight = instance.vm.barHeight
  console.log('removeHeight-' + removeHeight)
  for (let i = index; i <= len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return

  const {
    ...rest
  } = options

  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    }
  })
  const id = `notification_${seed++}`
  console.log('id' + id)
  instance.id = id

  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })

  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  instance.vm.$on('closed', () => {
    removeInstance(instance) // 从数组中移除
    document.body.removeChild(instance.vm.$el) // 从dom中移除
    instance.vm.$destroy() // 销毁
  })

  instance.vm.$on('ison-close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
