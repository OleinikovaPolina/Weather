import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Weather from "../views/Weather"
import NotFound from "../views/NotFound"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/weather/:id',
        name: 'Weather',
        component: Weather
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router
