<script setup>
import { ref, watch, onMounted } from 'vue';
const today = new Date().toISOString().substring(0, 10); //날짜
const selectedDate = ref(today);

//날짜 변경
watch(selectedDate, (newDate) => {
  console.log('선택된 날짜:', newDate);
});

onMounted(() => {
  console.log('초기 날짜 설정됨:', selectedDate.value);
});
</script>

<template>
  <div class="header-bar">
    <button class="menu-btn">☰</button>
    <div class="box">
      <label for="calendar">날짜 선택</label>
      <input id="calendar" type="date" v-model="selectedDate" />
    </div>
    <div class="right-buttons">
      <button class="add-btn">+</button>
      <button class="logout-btn">로그아웃</button>
    </div>
  </div>
</template>
