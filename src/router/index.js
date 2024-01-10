import { createRouter, createWebHistory } from 'vue-router'
import Weather from '../views/Weather.vue'
import MeteoDetails from '../views/MeteoDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Weather
    },
    { path: '/MeteoDetails', component: MeteoDetails },
  ]
})

export default router
