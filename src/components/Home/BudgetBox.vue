<script setup>
import { onMounted } from 'vue'
import { useBudgetStore } from '@/stores/budget'
import axios from 'axios'

const budget = useBudgetStore()
const API_URL = 'http://localhost:3001/management'

const fetchBudgetData = async () => {
  try {
    const res = await axios.get(API_URL)
    const data = res.data[0]
    if (data) {
      budget.setBudgetData(data.actualIncome, data.actualSpending)
    }
  } catch (error) {
    console.error('예산 데이터 불러오기 실패:', error)
  }
}

onMounted(() => {
  fetchBudgetData()
})
</script>

<template>
  <div class="box budget-box" @click="$router.push('/management')">
    <h3>💰 총 예산 요약</h3>
    <p>실제 월별 수입: ₩{{ budget.actualIncomeTotal.toLocaleString() }}</p>
    <p>실제 월별 지출: ₩{{ budget.actualSpendingTotal.toLocaleString() }}</p>
    <p>남은 잔액: ₩{{ budget.actualBalance.toLocaleString() }}</p>
  </div>
</template>