// index.js
import { createRouter, createWebHistory } from 'vue-router';
import Summary from '@/views/Summary.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },
  ],
});

export default router;
