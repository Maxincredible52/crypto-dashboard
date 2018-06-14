import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VueResource from 'vue-resource'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'
import CoinDetails from './components/CoinDetails.vue'
import TableView from './components/TableView.vue'

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)
Vue.use(VueResource)
Vue.use(Buefy)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: TableView },
    { path: '/:coinId', component: CoinDetails, props: true }
  ]
})

new Vue({
  router,
  provide: apolloProvider.provide(),
  render: (h) => h(App)
  ,
}).$mount('#app')
