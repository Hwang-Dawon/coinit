import { createRouter, createWebHistory } from 'vue-router';

import TransactionSearch from '@/views/TransactionSearch.vue';
import RecordPage from '../views/RecordPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/transactions', name: 'TransactionSearch', component: TransactionSearch },
    { path: '/record', name: 'record', component: RecordPage },
  ],
});

export default router;
