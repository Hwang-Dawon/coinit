<script setup>
import { ref } from 'vue';
</script>

<template>
  <div class="summary">
    <h2>월별 요약</h2>
    <div class="month-summary">
      <p>총 수입</p>
      <p>총 지출</p>
    </div>

    <h2>카테고리별 지출 현황</h2>
    <div class="category-summary"></div>

    <h2>카테고리별 지출 내역</h2>
    <div class="category-detail"></div>
  </div>
</template>

<style scoped></style>
