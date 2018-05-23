import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.use(Buefy)
Vue.config.productionTip = false


new Vue({
    render: h => h(App)
}).$mount('#app')
