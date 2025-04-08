// App.vue
<script setup>
import LoginPage from '@/views/LoginPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import Summary from '@/views/Summary.vue';
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <LoginPage />
  <RouterView />
  <!-- <Summary /> -->
  <!-- Summary 컴포넌트 추가 -->

  <div id="app">
    <header>
      <h1>나의 가계부</h1>
      <nav>

        <RouterLink to="/record">기록</RouterLink> |
        <RouterLink to="/transactions">거래 조회</RouterLink>
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
