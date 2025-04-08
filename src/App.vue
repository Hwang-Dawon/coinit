<template>
  <div id="app">
    <header>
      <h1>나의 가계부</h1>
      <nav><router-link to="/transactions">거래 조회</router-link> |</nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2025 나의 가계부</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped></style>
