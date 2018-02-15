export default {
  install (Vue) {
    const EventBus = new Vue({})
    Vue.prototype.$events = EventBus
    Vue.EventBus = EventBus
  }
}
