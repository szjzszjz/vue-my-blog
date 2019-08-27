import Vue from 'vue'
import AlertView from './AlertView'

const AlertViewConstructor = Vue.extend(AlertView)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const index = instances.findIndex(inst => inst.id === instance.id)
  instances.splice(index, 1)
}

const alert = (options) => {
  const {
    ...rest
  } = options

  const instance = new AlertViewConstructor({
    propsData: {
      ...rest
    }
  })
  const id = `alert_${seed++}`
  console.log('id--', id)
  instance.id = id

  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

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

export default alert
