// index.js
import { createRouter, createWebHistory } from 'vue-router';
import Summary from '@/components/Summary.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
