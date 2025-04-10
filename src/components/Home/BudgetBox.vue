<script setup>
import { onMounted } from 'vue';
import { useBudgetStore } from '@/stores/budget';

const budget = useBudgetStore();

onMounted(() => {
  budget.fetchTransactions();
});
</script>

<template>
  <div class="box budget-box">
    <h3>💰 예산 요약</h3>
    <p>총 수입: ₩{{ budget.actualIncomeTotal.toLocaleString() }}</p>
    <p>총 지출: ₩{{ budget.actualSpendingTotal.toLocaleString() }}</p>
    <p>잔액: ₩{{ budget.actualBalance.toLocaleString() }}</p>
  </div>
</template>
