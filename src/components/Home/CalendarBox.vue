<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const selectedDate = ref(new Date());
</script>

<template>
  <div style="text-align: center; margin-top: 20px">
    <!-- 항상 열려있는 달력 -->
    <Datepicker v-model="selectedDate" inline />
  </div>
</template>
