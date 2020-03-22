import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Scanner from "./components/Scanner";
import Driver from "./components/Driver";
import Healthcheck from "./components/Healthcheck";
import NotFound from "./components/NotFound";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/scanner',
            name: 'scanner',
            component: Scanner
        },
        {
            path: '/driver',
            name: 'driver',
            component: Driver,
            props: true
        },
        {
            path: '/healthcheck',
            name: 'healthcheck',
            component: Healthcheck,
            props: true,
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
        }
    ],
    mode: 'history'
});

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')