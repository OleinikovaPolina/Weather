import Vue from 'vue'
import App from '@/App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from '@/store/index.ts'
import './registerServiceWorker'
import moment from "moment"

Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
