<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToMypage = () => {
  router.push('/mypage');
};
</script>

<template>
  <aside class="sidebar">
    <ul>
      <li @click="goToMypage">마이페이지</li>
      <li>수입/지출 내역</li>
      <li>재정 관리</li>
      <li>카테고리</li>
    </ul>
  </aside>
</template>
