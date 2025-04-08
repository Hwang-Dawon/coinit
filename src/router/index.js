// index.js
import { createRouter, createWebHistory } from 'vue-router';
import Summary from '@/components/Summary.vue';
// import HomeView from '@/views/HomeView.vue'; // HomeView 컴포넌트 import

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/', // 루트 경로
    //   name: 'home',
    //   component: HomeView, // HomeView 컴포넌트 사용
    // },
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
