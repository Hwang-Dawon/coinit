// src/stores/budget.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const useBudgetStore = defineStore('budget', () => {
  const manualBalance = ref(0);
  const actualIncome = ref([]);
  const actualSpending = ref([]);
  const transactions = ref([]);

  const actualIncomeTotal = computed(() => actualIncome.value.reduce((sum, item) => sum + item.amount, 0));
  const actualSpendingTotal = computed(() => actualSpending.value.reduce((sum, item) => sum + item.amount, 0));
  const actualBalance = computed(() => actualIncomeTotal.value - actualSpendingTotal.value);

  const fetchBudget = async () => {
    const res = await axios.get(`${API_URL}/management`);
    const data = res.data[0];
    if (data) {
      manualBalance.value = data.manualBalance;
      actualIncome.value = data.actualIncome;
      actualSpending.value = data.actualSpending;
    }
  };

  const saveBudget = async () => {
    const payload = {
      id: 1,
      manualBalance: manualBalance.value,
      actualIncome: actualIncome.value,
      actualSpending: actualSpending.value,
    };
    await axios.put(`${API_URL}/management/1`, payload);
  };

  const fetchTransactions = async () => {
    const res = await axios.get(`${API_URL}/transactions`);
    transactions.value = res.data;
  };

  const addTransaction = async (tx) => {
    await axios.post(`${API_URL}/transactions`, tx);
    await fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/transactions/${id}`);
    await fetchTransactions();
  };

  return {
    manualBalance,
    actualIncome,
    actualSpending,
    transactions,
    actualIncomeTotal,
    actualSpendingTotal,
    actualBalance,
    fetchBudget,
    saveBudget,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
  };
});