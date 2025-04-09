import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import LoginPage from '@/views/LoginPage.vue';
import Summary from '@/views/Summary.vue';
import TransactionSearch from '@/views/TransactionSearch.vue';
import RecordPage from '../views/RecordPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', // 기본 경로를 로그인 페이지로 설정
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },

    { path: '/Home', name: 'Home', component: Home },

    {
      path: '/transactions',
      name: 'TransactionSearch',
      component: TransactionSearch,
    },
    { path: '/record', name: 'record', component: RecordPage },
  ],
});

export default router;
