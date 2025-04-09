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
        <RouterLink to="/record">기록</RouterLink> |
        <RouterLink to="/transactions">거래 조회</RouterLink>|
        <!-- summary로 향하는 요약 버튼 추가 -->
        <RouterLink to="/summary">요약</RouterLink>|
      </nav>
    </header>

    <main>
      <!-- <LoginPage /> -->
      <RouterView />
      <!-- <Summary /> -->
    </main>

    <footer>
      <p>&copy; 2025 나의 가계부</p>
    </footer>
  </div>
</template>

<style scoped></style>
