<<<<<<< HEAD
// index.js
import { createRouter, createWebHistory } from 'vue-router';
import Summary from '@/views/Summary.vue';
=======
import { createRouter, createWebHistory } from 'vue-router';

import TransactionSearch from '@/views/TransactionSearch.vue';
import RecordPage from '../views/RecordPage.vue';
>>>>>>> Develop

const router = createRouter({
  history: createWebHistory(),
  routes: [
<<<<<<< HEAD
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },
=======
    { path: '/', name: 'Home', component: Home },
    { path: '/transactions', name: 'TransactionSearch', component: TransactionSearch },
    { path: '/record', name: 'record', component: RecordPage },
>>>>>>> Develop
  ],
});

export default router;
