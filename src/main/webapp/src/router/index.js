import {createRouter, createWebHistory} from 'vue-router'
import HomeView                         from '../views/HomeView.vue'

const routes = [
    {
        path     : '/',
        name     : 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path     : '/profile',
        name     : 'profile',
        component: () => import('../views/ProfileView.vue')
    },
    {
        path     : '/login',
        name     : 'login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path     : '/register',
        name     : 'register',
        component: () => import('../views/RegisterView.vue')
    },
    {
        path     : '/stack/:stackId',
        name     : 'stack',
        component: () => import('../views/StackView.vue')
    },
    {
        path     : '/study/:stackId',
        name     : 'study',
        component: () => import('../views/StudyView.vue')
    }
]

const router = createRouter({
                                history: createWebHistory(process.env.BASE_URL),
                                routes
                            })

export default router
