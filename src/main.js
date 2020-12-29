import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Discover from './views/discover/Discover.vue';
import Recommendation from './views/recommendation/Recommendation.vue';

 
Vue.use(VueAxios, axios)
Vue.use(VueRouter);
  

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/discover'},
    { path: '/recommendation', component: Recommendation, name: 'recommendation'},
    { path: '/discover', component: Discover, name: 'discover'},
  ]
})

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')