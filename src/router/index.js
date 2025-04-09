import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/views/LoginPage.vue';
import Summary from '@/views/Summary.vue';
import TransactionSearch from '@/views/TransactionSearch.vue';
import RecordPage from '../views/RecordPage.vue';
import RecordEdit from '@/views/RecordEdit.vue';

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

    // { path: '/Home', name: 'Home', component: Home },
    {
      path: '/transactions',
      name: 'TransactionSearch',
      component: TransactionSearch,
    },
    { path: '/record', name: 'record', component: RecordPage },
    { path: '/record/:id', name: 'RecordEdit', component: RecordEdit },
  ],
});

export default router;
