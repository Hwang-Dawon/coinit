import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/views/LoginPage.vue';
import Summary from '@/views/Summary.vue';
import TransactionSearch from '@/views/TransactionSearch.vue';
import RecordPage from '../views/RecordPage.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },

    { path: '/', name: 'Home', component: HomeView },
    {
      path: '/transactions',
      name: 'TransactionSearch',
      component: TransactionSearch,
    },
    { path: '/record', name: 'record', component: RecordPage },
  ],
});

export default router;
