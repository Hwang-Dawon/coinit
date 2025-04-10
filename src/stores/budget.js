import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useBudgetStore = defineStore('budget', () => {
  const actualIncome = ref([]);
  const actualSpending = ref([]);

  const actualIncomeTotal = computed(() =>
    actualIncome.value.reduce((sum, item) => sum + item.amount, 0)
  );
  const actualSpendingTotal = computed(() =>
    actualSpending.value.reduce((sum, item) => sum + item.amount, 0)
  );
  const actualBalance = computed(() => actualIncomeTotal.value - actualSpendingTotal.value);

  const setBudgetData = (income, spending) => {
    actualIncome.value = income;
    actualSpending.value = spending;
  };

  // ✅ 수입/지출 데이터 불러오는 액션
  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:3001/transactions');
      const data = res.data;

      actualIncome.value = data.filter(t => t.type === 'income');
      actualSpending.value = data.filter(t => t.type === 'expense');
    } catch (err) {
      console.error('데이터 불러오기 실패:', err);
    }
  };

  return {
    actualIncome,
    actualSpending,
    actualIncomeTotal,
    actualSpendingTotal,
    actualBalance,
    fetchTransactions,  // <- export!
    setBudgetData
  };
});