<template>
  <div class="management">
    <h2>총 예산</h2>
    <div class="summary-card">
      <label for="manualBalanceInput">직접 입력한 총 금액:</label>
      <input id="manualBalanceInput" type="number" v-model.number="budgetStore.manualBalance" placeholder="₩ 금액 입력" />
      <button class="btn btn-add" @click="saveBudget">저장</button>
      <p>✔️ 등록된 총 금액: ₩{{ budgetStore.manualBalance.toLocaleString() }}</p>
    </div>

    <h3>📌 고정 지출 내역</h3>
    <table class="budget-table">
      <thead>
        <tr><th>항목</th><th>지출 내역</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in housing" :key="'fixed' + index">
          <td><input v-model="item.name" /></td>
          <td><input type="number" v-model.number="item.actual" /></td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button class="btn btn-edit" @click="toggleHousingMenu">수정</button>
      <button v-if="showEditHousingMenu" class="btn btn-add" @click="addHousing">추가</button>
      <button v-if="showEditHousingMenu" class="btn btn-delete" @click="deleteHousing">삭제</button>
    </div>

    <h3>실제 월별 수입</h3>
    <table class="budget-table">
      <thead><tr><th>항목</th><th>금액</th></tr></thead>
      <tbody>
        <tr v-for="(item, index) in budgetStore.actualIncome" :key="'income' + index">
          <td><input v-model="item.name" /></td>
          <td><input type="number" v-model.number="item.amount" /></td>
        </tr>
        <tr class="total-row">
          <td><strong>총 수입</strong></td>
          <td><strong>₩{{ budgetStore.actualIncomeTotal.toLocaleString() }}</strong></td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button class="btn btn-edit" @click="toggleIncomeMenu">수정</button>
      <button v-if="showEditIncomeMenu" class="btn btn-add" @click="addIncome">추가</button>
      <button v-if="showEditIncomeMenu" class="btn btn-delete" @click="deleteIncome">삭제</button>
    </div>

    <h3>실제 월별 지출</h3>
    <table class="budget-table">
      <thead><tr><th>항목</th><th>금액</th></tr></thead>
      <tbody>
        <tr v-for="(item, index) in budgetStore.actualSpending" :key="'spend' + index">
          <td><input v-model="item.name" /></td>
          <td><input type="number" v-model.number="item.amount" /></td>
        </tr>
        <tr class="total-row">
          <td><strong>총 지출</strong></td>
          <td><strong>₩{{ budgetStore.actualSpendingTotal.toLocaleString() }}</strong></td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button class="btn btn-edit" @click="toggleSpendingMenu">수정</button>
      <button v-if="showEditSpendingMenu" class="btn btn-add" @click="addSpending">추가</button>
      <button v-if="showEditSpendingMenu" class="btn btn-delete" @click="deleteSpending">삭제</button>
    </div>

    <!-- 일별 재정 상태 -->
    <h3>📅 일별 재정 상태</h3>
    <table class="budget-table">
      <thead><tr><th>날짜</th><th>항목</th><th>금액</th></tr></thead>
      <tbody>
        <tr v-for="item in transactions" :key="item.id">
          <td>
            <template v-if="deleteMode"><input type="checkbox" v-model="item.selected" /></template>
            <input type="date" v-model="item.date" />
          </td>
          <td><input v-model="item.description" /></td>
          <td><input type="number" v-model.number="item.amount" /></td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button class="btn btn-edit" @click="toggleEditMenu">수정</button>
      <button v-if="showEditMenu" class="btn btn-add" @click="addItem">추가</button>
      <button v-if="showEditMenu" class="btn btn-add" @click="saveEditedTransactions">저장</button>
      <button v-if="showEditMenu" class="btn btn-delete" @click="toggleDeleteMode">{{ deleteMode ? '삭제 취소' : '삭제' }}</button>
      <button v-if="deleteMode && transactions.some(t => t.selected)" class="btn btn-delete" @click="deleteSelectedItems">선택 항목 삭제</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBudgetStore } from '@/stores/budget';
import axios from 'axios';

const budgetStore = useBudgetStore();
const housing = ref([]);
const transactions = ref([]);
const deleteMode = ref(false);

const showEditIncomeMenu = ref(false);
const showEditSpendingMenu = ref(false);
const showEditHousingMenu = ref(false);
const showEditMenu = ref(false);

const TX_URL = 'http://localhost:3001/transactions';
const API_URL = 'http://localhost:3001/management';

onMounted(async () => {
  await budgetStore.fetchBudget();
  await fetchTransactions();
});

const fetchTransactions = async () => {
  const res = await axios.get(TX_URL);
  transactions.value = res.data.map(tx => ({ ...tx, selected: false }));
};

const addItem = async () => {
  const newTx = {
    id: Date.now(),
    date: new Date().toISOString().slice(0, 10),
    description: '',
    amount: 0,
    type: 'expense',
    category: '기타',
    memo: '',
    selected: false
  };
  await axios.post(TX_URL, newTx);
  await fetchTransactions();
};

const saveEditedTransactions = async () => {
  for (const tx of transactions.value) {
    await axios.put(`${TX_URL}/${tx.id}`, tx);
  }
  alert('거래 내역 저장 완료!');
  await fetchTransactions();
};

const deleteSelectedItems = async () => {
  const confirmed = confirm('선택한 항목을 삭제하시겠습니까?');
  if (!confirmed) return;
  const toDelete = transactions.value.filter(t => t.selected);
  for (const tx of toDelete) {
    await axios.delete(`${TX_URL}/${tx.id}`);
  }
  await fetchTransactions();
  deleteMode.value = false;
};

const toggleEditMenu = () => (showEditMenu.value = !showEditMenu.value);
const toggleDeleteMode = () => (deleteMode.value = !deleteMode.value);
const toggleIncomeMenu = () => (showEditIncomeMenu.value = !showEditIncomeMenu.value);
const toggleSpendingMenu = () => (showEditSpendingMenu.value = !showEditSpendingMenu.value);
const toggleHousingMenu = () => (showEditHousingMenu.value = !showEditHousingMenu.value);

const addIncome = () => budgetStore.actualIncome.push({ name: '', amount: 0 });
const deleteIncome = () => budgetStore.actualIncome.pop();

const addSpending = () => budgetStore.actualSpending.push({ name: '', amount: 0 });
const deleteSpending = () => budgetStore.actualSpending.pop();

const addHousing = () => housing.value.push({ name: '', actual: 0 });
const deleteHousing = () => housing.value.pop();

const saveBudget = async () => {
  const payload = {
    id: 1,
    manualBalance: budgetStore.manualBalance,
    actualIncome: budgetStore.actualIncome,
    actualSpending: budgetStore.actualSpending,
    housing: housing.value
  };
  await axios.put(`${API_URL}/1`, payload);
  alert('예산 저장 완료!');
};
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
