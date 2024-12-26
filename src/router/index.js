import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import HomePage from "../pages/HomePage.vue";
import Exercise from "@/pages/Exercise.vue";
import Health from "@/pages/Health.vue";
import ScreenTime from "@/pages/ScreenTime.vue";
import Sleep from "@/pages/Sleep.vue";
import Diet from "@/pages/Diet.vue";
import Water from "@/pages/Water.vue";
import MentalHealth from "@/pages/MentalHealth.vue";
import Walk from "@/pages/Walk.vue";

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
    {
        path: '/exercise',
        name: 'Exercise',
        component: Exercise,
    },
    {
        path: '/health',
        name: 'Health',
        component: Health,
    },
    {
        path: '/screentime',
        name: 'ScreenTime',
        component: ScreenTime,
    },
    {
        path: '/sleep',
        name: 'Sleep',
        component: Sleep,
    },
    {
        path: '/diet',
        name: 'Diet',
        component: Diet,
    },
    {
        path: '/water',
        name: 'Water',
        component: Water,
    },
    {
        path: '/mentalhealth',
        name: 'MentalHealth',
        component: MentalHealth,
    },
    {
        path: '/walk',
        name: 'Walk',
        component: Walk,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// ROUTE GUARD TO CHECK AUTHENTICATION'S STATUS
router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (to.meta.requiresAuth && !user) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router;
