import { createRouter, createWebHistory } from 'vue-router';
import Homeview from '@/views/HomeView.vue';
import LoginPage from '@/views/LoginPage.vue';
import Summary from '@/views/Summary.vue';
import TransactionSearch from '@/views/TransactionSearch.vue';
import RecordPage from '../views/RecordPage.vue';
import RecordEdit from '@/views/RecordEdit.vue';
import JoinPage from '@/views/JoinPage.vue';
import Management from '@/views/Management.vue';
import Mypage from '@/views/Mypage.vue';
import PasswordCheck from '@/views/PasswordCheck.vue';
import EditInfo from '@/views/EditInfo.vue';

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
      path: '/mypage',
      name: 'mypage',
      component: Mypage,
    },
    {
      path: '/mypage/verify',
      name: 'verify',
      component: PasswordCheck,
    },
    {
      path: '/mypage/edit',
      name: 'edit',
      component: EditInfo,
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },
    {
      path: '/Home',
      name: 'Home',
      component: Homeview,

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
