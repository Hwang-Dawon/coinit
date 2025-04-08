// index.js
import { createRouter, createWebHistory } from 'vue-router';
import Summary from '@/components/Summary.vue'; // Summary 컴포넌트 import

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Summary, // Summary 컴포넌트 사용
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
