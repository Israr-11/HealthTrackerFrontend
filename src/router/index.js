import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import HomePage from "../pages/HomePage.vue";

const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Route guard to check authentication status
router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (to.meta.requiresAuth && !user) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router;
