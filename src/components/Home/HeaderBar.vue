<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedDate = ref(''); // 초기에 빈 값

// 페이지가 로드시 오늘 날짜로 설정
onMounted(() => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  selectedDate.value = `${yyyy}-${mm}-${dd}`; // yyyy-mm-dd 형식
  console.log('초기 날짜 설정됨:', selectedDate.value);
});
// 날짜 변경
watch(selectedDate, (newDate) => {
  console.log('선택된 날짜:', newDate);
});

//레코드 페이지로 이동
const goToRecordPage = () => {
  router.push('/record');
};
</script>

<template>
  <div class="header-bar">
    <button class="menu-btn">☰</button>
    <div class="box">
      <label for="calendar">날짜 선택</label>
      <input id="calendar" type="date" v-model="selectedDate" />
    </div>
    <div class="right-buttons">
      <button class="add-btn" @click="goToRecordPage">+</button>
      <button class="logout-btn">로그아웃</button>
    </div>
  </div>
</template>
