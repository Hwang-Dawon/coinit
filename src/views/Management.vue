<template>
  <div class="management">
    <h2>총 예산</h2>

    <!-- 잔액 요약 카드 -->
    <div class="summary-card">
      <p>실제 총 금액: ₩{{ actualBalance.toLocaleString() }}</p>
    </div>

    <!-- 고정 지출 내역 -->
    <h3>📌 고정 지출 내역</h3>
    <table class="budget-table">
      <thead>
        <tr><th>항목</th><th>지출 내역</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in housing" :key="'fixed' + index">
          <td>{{ item.name }}</td>
          <td>₩{{ item.actual.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 실제 월별 수입. -->
    <h3>실제 월별 수입</h3>
    <table class="budget-table">
      <thead><tr><th>항목</th><th>금액</th></tr></thead>
      <tbody>
        <tr v-for="(item, index) in actualIncome" :key="'income' + index">
          <td>{{ item.name }}</td>
          <td>₩{{ item.amount.toLocaleString() }}</td>
        </tr>
        <tr class="total-row">
          <td><strong>총 수입</strong></td>
          <td><strong>₩{{ actualIncomeTotal.toLocaleString() }}</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- 실제 월별 지출 -->
    <h3>실제 월별 지출</h3>
    <table class="budget-table">
      <thead><tr><th>항목</th><th>금액</th></tr></thead>
      <tbody>
        <tr v-for="(item, index) in actualSpending" :key="'spend' + index">
          <td>{{ item.name }}</td>
          <td>₩{{ item.amount.toLocaleString() }}</td>
        </tr>
        <tr class="total-row">
          <td><strong>총 지출</strong></td>
          <td><strong>₩{{ actualSpendingTotal.toLocaleString() }}</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- 일별 재정 상태 -->
    <h3>📅 일별 재정 상태</h3>
    <table class="budget-table">
      <thead><tr><th>날짜</th><th>항목</th><th>금액</th></tr></thead>
      <tbody>
        <tr v-for="item in transactions" :key="item.id">
          <td>
            <template v-if="deleteMode"><input type="checkbox" v-model="item.selected" /></template>
            <input type="date" v-model="item.date" />
          <td>{{ item.date }}</td>
          <td>{{ item.desc }}</td>
          <td :class="{ negative: item.amount < 0 }">
            ₩{{ item.amount.toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button class="btn btn-edit" @click="toggleEditMenu">수정</button>
      <button v-if="showEditMenu" class="btn btn-add" @click="addItem">추가</button>
      <button v-if="showEditMenu" class="btn btn-delete" @click="toggleDeleteMode">{{ deleteMode ? '삭제 취소' : '삭제' }}</button>
      <button v-if="deleteMode && transactions.some(t => t.selected)" class="btn btn-delete" @click="deleteSelectedItems">선택 항목 삭제</button>

    <header>
      <h1>재정관리, 예산</h1>
      <p>{{ today }}</p>
    </header>
    <!-- 예산관리 -->
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
          {{ m.month }}월 수입: {{ m.income.toLocaleString() }}원 / 지출:
          {{ m.expense.toLocaleString() }}원
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
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useBudgetStore } from '@/stores/budget';

const manualBalanceInput = ref(0)
const manualBalance = ref(0)
const actualIncome = ref([])
const actualSpending = ref([])
const housing = ref([])

const transactions = ref([])
const deleteMode = ref(false)

const API_URL = 'http://localhost:3001/management'
const TX_URL = 'http://localhost:3001/transactions'
import { ref, computed } from 'vue';

const actualIncome = ref([
  { name: '월급', amount: 4000000 },
  { name: '투잡 수입', amount: 300000 },
]);

const fetchBudget = async () => {
  const res = await axios.get(API_URL)
  const data = res.data[0]
  if (data) {
    manualBalance.value = data.manualBalance
    actualIncome.value = data.actualIncome
    actualSpending.value = data.actualSpending
    housing.value = data.housing

    budgetStore.setBudgetData(actualIncome.value, actualSpending.value);

  }
}
const fetchTransactions = async () => {
  const res = await axios.get(TX_URL)
  transactions.value = res.data.map((tx) => ({ ...tx, selected: false }))
}
onMounted(() => {
  fetchBudget()
  fetchTransactions()
})

const budgetStore = useBudgetStore();

const saveBudget = async () => {
  const payload = {
    id: 1,
    manualBalance: manualBalance.value,
    actualIncome: actualIncome.value,
    actualSpending: actualSpending.value,
    housing: housing.value

  }
  await axios.put(`${API_URL}/1`, payload);

  budgetStore.setBudgetData(actualIncome.value, actualSpending.value);

  alert('저장 완료!');
}

const addItem = () => {
  transactions.value.push({ id: Date.now(), date: new Date().toISOString().slice(0, 10), desc: '', amount: 0, selected: false })
}
const toggleDeleteMode = () => {
  deleteMode.value = !deleteMode.value
}
const deleteSelectedItems = async () => {
  const confirmed = confirm('선택한 항목을 삭제하시겠습니까?')
  if (!confirmed) return
  const toDelete = transactions.value.filter(t => t.selected)
  for (const tx of toDelete) {
    await axios.delete(`${TX_URL}/${tx.id}`)
  }
  await fetchTransactions()
  deleteMode.value = false
}

const setManualBalance = () => {
  manualBalance.value = manualBalanceInput.value
  saveBudget()
}
const actualIncomeTotal = computed(() => actualIncome.value.reduce((sum, item) => sum + item.amount, 0))
const actualSpendingTotal = computed(() => actualSpending.value.reduce((sum, item) => sum + item.amount, 0))

const showEditIncomeMenu = ref(false)
const toggleIncomeMenu = () => (showEditIncomeMenu.value = !showEditIncomeMenu.value)
const addIncome = () => actualIncome.value.push({ name: '', amount: 0 })
const deleteIncome = () => actualIncome.value.pop()

const showEditSpendingMenu = ref(false)
const toggleSpendingMenu = () => (showEditSpendingMenu.value = !showEditSpendingMenu.value)
const addSpending = () => actualSpending.value.push({ name: '', amount: 0 })
const deleteSpending = () => actualSpending.value.pop()

const showEditHousingMenu = ref(false)
const toggleHousingMenu = () => (showEditHousingMenu.value = !showEditHousingMenu.value)
const addHousing = () => housing.value.push({ name: '', actual: 0 })
const deleteHousing = () => housing.value.pop()

const showEditMenu = ref(false)
const toggleEditMenu = () => (showEditMenu.value = !showEditMenu.value)
const transactions = ref([
  {
    id: 1,
    date: new Date().toISOString().slice(0, 10),
    desc: '커피',
    amount: -4500,
  },
  {
    id: 2,
    date: new Date().toISOString().slice(0, 10),
    desc: '지하철',
    amount: -1250,
  },
]);

const actualIncomeTotal = computed(() =>
  actualIncome.value.reduce((sum, item) => sum + item.amount, 0)
);

const actualSpendingTotal = computed(() =>
  actualSpending.value.reduce((sum, item) => sum + item.amount, 0)
);

const actualHousingTotal = computed(() =>
  housing.value.reduce((sum, item) => sum + item.actual, 0)
);

const actualBalance = computed(
  () => actualIncomeTotal.value - actualHousingTotal.value
);
</script>

<style scoped>
.management {
  max-width: 900px;
  margin: 2rem auto;
  font-family: 'Segoe UI', sans-serif;
  padding: 1rem;
}
h2 {
  font-size: 28px;
  color: #003366;
  margin-bottom: 1rem;
}
h3 {
  margin-top: 2rem;
  color: #003366;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
}
.summary-card {
  background-color: #e3f2fd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
.summary-card p {
  margin: 0.5rem 0;
  font-weight: 500;
  color: #004d80;
}

.summary-card .diff {
  color: #d32f2f;
}
.budget-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}
.budget-table th {
  background-color: #bbdefb;
  padding: 10px;
  text-align: center;
  color: #003366;
  font-weight: bold;
  border: 1px solid #ccc;
}
.budget-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: right;
}
.budget-table td:first-child {
  text-align: left;
}
.total-row {
  background-color: #e3f2fd;
}
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.5rem;
}
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  border: none;
  transition: background-color 0.2s ease;
}
.btn-add {
  background-color: #007bff;
}
.btn-edit {
  background-color: #ffc400;
}
.btn-delete {
  background-color: #f44336;
}
.btn:hover {
  filter: brightness(0.95);
}
input[type='text'],
input[type='number'],
input[type='date'] {
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
