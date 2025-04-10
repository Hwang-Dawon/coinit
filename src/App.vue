<script setup>
import LoginPage from '@/views/LoginPage.vue';
import Summary from '@/views/Summary.vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <header>
      <h1>나의 가계부</h1>
      <nav>
        <RouterLink to="/">홈</RouterLink> |
        <RouterLink to="/record">기록</RouterLink> |
        <RouterLink to="/summary">요약</RouterLink>|
        <RouterLink to="/transactions">거래 조회</RouterLink> |
        <RouterLink to="/Management">재정관리</RouterLink> |
        <RouterLink to="/mypage">마이페이지</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2025 나의 가계부</p>
    </footer>
  </div>
</template>

<style scoped></style>
