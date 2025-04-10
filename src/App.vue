<script setup>
import LoginPage from '@/views/LoginPage.vue';
import Summary from '@/views/Summary.vue';
import { RouterLink, RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter();
const hiddenPaths = ['/', '/join', '/login'];
</script>

<template>
  <div id="app">
    <header>
      <h1>나의 가계부</h1>
      <nav v-if="!hiddenPaths.includes(router.currentRoute.value.path)">
        <RouterLink to="/Home">홈</RouterLink> |
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

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #ffc400;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header h1 {
  font-size: 20px;
  margin: 0;
}

nav {
  display: flex;
  gap: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

main {
  flex: 1;
  padding: 20px;
}

footer {
  background-color: #ffc400;
  color: white;
  text-align: center;
  padding: 10px 0;
}
</style>
