<template>
    <div class="management">
  
      <header>
        <h1>재정관리, 예산</h1>
        <p>{{ today }}</p>
      </header>
  
      <section class="budget-status">
        <p>예산: {{ budget.toLocaleString() }}원</p>
        <p>보유 금액: {{ balance.toLocaleString() }}원</p>
      </section>
  
      <div class="fixed-expense">
        <h3>고정 지출내역</h3>
        <ul>
          <li v-for="item in expenses" :key="item.name">
            {{ item.name }}: {{ item.amount.toLocaleString() }}원
          </li>
        </ul>
      </div>
  
      <div class="monthly-status">
        <h3>월별 재정상태</h3>
        <ul>
          <li v-for="m in monthly" :key="m.month">
            {{ m.month }}월 수입: {{ m.income.toLocaleString() }}원 / 지출: {{ m.expense.toLocaleString() }}원
          </li>
        </ul>
      </div>

      <div class="daily-status">
        <h3>일별 재정상태</h3>
        <ul>
          <li v-for="t in transactions" :key="t.id">
            {{ t.desc }} - {{ t.amount.toLocaleString() }}원
          </li>
        </ul>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const today = new Date().toISOString().slice(0, 10)
  
  const budget = ref(1000000)
  const balance = ref(500000)

  const expenses = [
    { name: '통신비', amount: 50000 },
    { name: '월세', amount: 500000 }
  ]
  
  const monthly = [
    { month: 1, income: 2500000, expense: 1200000 },
    { month: 2, income: 2500000, expense: 1350000 }
  ]
  
  const transactions = [
    { id: 1, desc: '아이스크림', amount: -10000 },
    { id: 2, desc: '치킨', amount: -20000 }
  ]
  </script>
  
  <style scoped>
  .management {
    padding: 1rem;
    font-family: sans-serif;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 0.5rem;
  }
  
  section, .fixed-expense, .monthly-status, .daily-status {
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
  }
  
  li {
    margin-bottom: 0.3rem;
  }
  </style>