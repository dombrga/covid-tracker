import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import vueNumeralFilterInstaller from 'vue-numeral-filter'
// import { Chart } from 'chart.js'
// import zoomPlugin from 'chartjs-plugin-zoom.js'

Vue.config.productionTip = false
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });
// Chart.register(zoomPlugin)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
