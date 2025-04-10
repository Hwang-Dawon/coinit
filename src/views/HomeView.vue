<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

import Sidebar from '@/components/Home/Sidebar.vue';
import HeaderBar from '@/components/Home/HeaderBar.vue';
import IncomeExpenseBox from '@/components/Home/IncomeExpenseBox.vue';
import ChartBox from '@/components/Home/ChartBox.vue';
import CalendarBox from '@/components/Home/CalendarBox.vue';
import BudgetBox from '@/components/Home/BudgetBox.vue';

const selectedDate = ref(new Date().toISOString().slice(0, 10)); // 초기값: 오늘
const transactions = ref([]);

const fetchTransactions = async () => {
  const res = await axios.get('http://localhost:3001/transactions');
  transactions.value = res.data;
};

const filteredTransactions = computed(() => transactions.value.filter((tx) => tx.date === selectedDate.value));

onMounted(() => {
  fetchTransactions();
});
</script>

<template>
  <div class="home-container">
    <HeaderBar />
    <div class="main-wrapper">
      <div class="sidebar">
        <Sidebar />
      </div>

      <div class="main-content">
        <div class="top-boxes">
          <IncomeExpenseBox class="box" />
        </div>

        <div class="middle-boxes">
          <ChartBox class="chart-box" />
          <CalendarBox class="small-box" />
          <BudgetBox class="small-box" />
        </div>
      </div>
    </div>
  </div>
</template>
