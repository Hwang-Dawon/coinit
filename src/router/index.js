import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/components/LoginPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      // children: [{ path: 'join', name: 'join', component: JoinPage }],
    },
  ],
});

export default router;
