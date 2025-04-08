<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
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
