
import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/components/LoginPage.vue';


// index.js
import { createRouter, createWebHistory } from 'vue-router';
import Summary from '@/views/Summary.vue';

import { createRouter, createWebHistory } from 'vue-router';

import TransactionSearch from '@/views/TransactionSearch.vue';
import RecordPage from '../views/RecordPage.vue';



const router = createRouter({
  history: createWebHistory(),
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


    {
      path: '/summary',
      name: 'summary',
      component: Summary,

    },

    { path: '/', name: 'Home', component: Home },
    { path: '/transactions', name: 'TransactionSearch', component: TransactionSearch },
    { path: '/record', name: 'record', component: RecordPage },

  ],
});

export default router;
