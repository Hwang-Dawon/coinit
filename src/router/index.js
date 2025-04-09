import { createRouter, createWebHistory } from 'vue-router';
import Homeview from '@/views/HomeView.vue';
import LoginPage from '@/views/LoginPage.vue';
import Summary from '@/views/Summary.vue';
import TransactionSearch from '@/views/TransactionSearch.vue';
import RecordPage from '../views/RecordPage.vue';
import RecordEdit from '@/views/RecordEdit.vue';
import JoinPage from '@/views/JoinPage.vue'; // 👈 이 줄 추가
import Home from '@/views/HomeView.vue';
import Management from '@/views/Management.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', // 기본 경로를 로그인 페이지로 설정
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/join',
      name: 'join',
      component: JoinPage,
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    },

    {
      path: '/transactions',
      name: 'TransactionSearch',
      component: TransactionSearch,
    },
    {
      path: '/management',
      name: 'Management',
      component: Management,
    },

    { path: '/record', name: 'record', component: RecordPage },
    { path: '/record/:id', name: 'RecordEdit', component: RecordEdit },
  ],
});

export default router;
