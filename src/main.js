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
            component: Home,
            title: 'Checkpoint | Fast Border Crossing',
            meta: {
                title: 'Checkpoint | Fast Border Crossing',
            }
        },
        {
            path: '/scanner',
            name: 'scanner',
            component: Scanner,
            meta: {
                title: 'Scanner | Fast Border Crossing',
            }
        },
        {
            path: '/driver',
            name: 'driver',
            component: Driver,
            props: true,
            meta: {
                title: 'Tour | Fast Border Crossing',
            }
        },
        {
            path: '/healthcheck',
            name: 'healthcheck',
            component: Healthcheck,
            props: true,
            meta: {
                title: 'Check | Fast Border Crossing',
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
            meta: {
                title: 'Not found | Fast Border Crossing',
            }
        }
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
});

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')