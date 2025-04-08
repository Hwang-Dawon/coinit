<script setup>
import { ref } from 'vue';
</script>

<template>
  <div class="summary">
    <h2 class="title">월별 요약</h2>
    <div class="month-summary">
      <p class="income">총 수입</p>
      <p class="expense">총 지출</p>
    </div>

    <h2 class="summary-title">카테고리별 지출 현황</h2>
    <div class="category-summary"></div>

    <h2 class="detail-title">카테고리별 지출 내역</h2>
    <div class="category-detail"></div>
  </div>
</template>

<!-- 스타일 생성 -->
<style scoped>
.summary {
  text-align: center;
}

.title {
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  text-align: center;
  left: 37%;
}

/* 월별 요약 */
.month-summary {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

/* 총 수입과 지출 */
.income,
.expense {
  border: 1px solid;
  padding: 50px 50px;
  border-radius: 10px;
  width: 150px;
}
.summary-title,
.detail-title {
  font-size: 14px;
}

/* 카테고리별 지출현황 */
.category-summary {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 20px auto;
  background-color: yellow;
}
/* 카테고리별 지출내역 */
.category-detail {
  border: 1px solid;
  padding: 20px;
  margin-top: 30px;
  min-height: 100px;
}
</style>
