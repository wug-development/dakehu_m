// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'

import radio from 'mint-ui/lib/radio'
import 'mint-ui/lib/radio/style.css'
import swipe from 'mint-ui/lib/swipe'
import 'mint-ui/lib/swipe/style.css'
import swipeItem from 'mint-ui/lib/swipe-item'
import 'mint-ui/lib/swipe-item/style.css'
import indicator from 'mint-ui/lib/indicator'
import 'mint-ui/lib/indicator/style.css'
import messagebox from 'mint-ui/lib/message-box'
import 'mint-ui/lib/message-box/style.css'

import common from '../common/common'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.uri = process.env.API_URL
Vue.prototype.uriw = process.env.APIW_URL
Vue.prototype.utils = common.utils
Vue.prototype.MessageBox = messagebox
Vue.prototype.Indicator = indicator

Vue.component(radio.name, radio)
Vue.component(swipe.name, swipe)
Vue.component(swipeItem.name, swipeItem)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
