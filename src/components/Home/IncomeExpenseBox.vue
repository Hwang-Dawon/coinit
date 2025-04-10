<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const recentIncome = ref([]);
const recentExpense = ref([]);

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/transactions');
  const data = res.data;

  recentIncome.value = data
    .filter((t) => t.type === 'income')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  recentExpense.value = data
    .filter((t) => t.type === 'expense')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
});
</script>

<template>
  <div class="income-expense-box">
    <h3>📈 최근 수입</h3>
    <ul>
      <li v-for="item in recentIncome" :key="item.id">
        {{ item.date }} - {{ item.description }} - {{ item.amount.toLocaleString() }}원
      </li>
    </ul>

    <h3>📉 최근 지출</h3>
    <ul>
      <li v-for="item in recentExpense" :key="item.id">
        {{ item.date }} - {{ item.description }} - {{ item.amount.toLocaleString() }}원
      </li>
    </ul>
  </div>
</template>
