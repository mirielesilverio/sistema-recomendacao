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
        { path: '/', redirect: '/discover' },
        { path: '/recommendation/:username', component: Recommendation, name: 'recommendation', props: true },
        { path: '/discover', component: Discover, name: 'discover' },
    ]
})


Vue.axios.interceptors.request.use(
    (config) => {
        let token = 'token 9f905f35ed99e108bcfb971e1aa2391d3eaedb94 ';
        config.headers['Authorization'] = token;
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


new Vue({
    render: h => h(App),
    router,
    components: { App }
}).$mount('#app')