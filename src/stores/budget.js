import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useBudgetStore = defineStore('budget', () => {
  const actualIncome = ref([
    { name: '월급', amount: 4000000 },
    { name: '투잡 수입', amount: 300000 },
  ]);

  const actualSpending = ref([
    { name: '식비', amount: 420000 },
    { name: '교통비', amount: 80000 },
    { name: '문화생활', amount: 160000 },
  ]);

  const actualIncomeTotal = computed(() => actualIncome.value.reduce((sum, item) => sum + item.amount, 0));

  const actualSpendingTotal = computed(() => actualSpending.value.reduce((sum, item) => sum + item.amount, 0));

  const actualBalance = computed(() => actualIncomeTotal.value - actualSpendingTotal.value);

  return {
    actualIncome,
    actualSpending,
    actualIncomeTotal,
    actualSpendingTotal,
    actualBalance,
  };
});
