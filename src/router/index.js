import { createRouter, createWebHistory } from 'vue-router';

import TransactionSearch from '@/views/TransactionSearch.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    {
      path: '/transactions',
      name: 'TransactionSearch',
      component: TransactionSearch,
    },
  ],
});

export default router;
