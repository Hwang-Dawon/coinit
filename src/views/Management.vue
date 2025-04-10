<template>
  <div class="management">
    <h2>총 예산</h2>

    <!-- 잔액 요약 카드 -->
    <div class="summary-card">
      <label for="manualBalanceInput">직접 입력한 총 금액:</label>
      <input id="manualBalanceInput" type="number" v-model.number="manualBalanceInput" placeholder="₩ 금액 입력" />
      <button class="btn btn-add" @click="setManualBalance">등록</button>
      <p>✔️ 등록된 총 금액: ₩{{ manualBalance.toLocaleString() }}</p>
    </div>

    <!-- 고정 지출 내역 -->
    <h3>📌 고정 지출 내역</h3>
    <table class="budget-table">
      <thead>
        <tr>
          <th>항목</th>
          <th>지출 내역</th>
        </tr>
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

    <!-- 실제 월별 수입. -->
    <h3>실제 월별 수입</h3>
    <table class="budget-table">
      <thead>
        <tr>
          <th>항목</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in actualIncome" :key="'income' + index">
          <td><input v-model="item.name" /></td>
          <td><input type="number" v-model.number="item.amount" /></td>
        </tr>
        <tr class="total-row">
          <td><strong>총 수입</strong></td>
          <td>
            <strong>₩{{ actualIncomeTotal.toLocaleString() }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button class="btn btn-edit" @click="toggleIncomeMenu">수정</button>
      <button v-if="showEditIncomeMenu" class="btn btn-add" @click="addIncome">추가</button>
      <button v-if="showEditIncomeMenu" class="btn btn-delete" @click="deleteIncome">삭제</button>
    </div>

    <!-- 실제 월별 지출 -->
    <h3>실제 월별 지출</h3>
    <table class="budget-table">
      <thead>
        <tr>
          <th>항목</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in actualSpending" :key="'spend' + index">
          <td><input v-model="item.name" /></td>
          <td><input type="number" v-model.number="item.amount" /></td>
        </tr>
        <tr class="total-row">
          <td><strong>총 지출</strong></td>
          <td>
            <strong>₩{{ actualSpendingTotal.toLocaleString() }}</strong>
          </td>
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
      <thead>
        <tr>
          <th>날짜</th>
          <th>항목</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in transactions" :key="item.id">
          <td>
            <template v-if="deleteMode"><input type="checkbox" v-model="item.selected" /></template>
            <input type="date" v-model="item.date" />
          </td>
          <td><input v-model="item.desc" /></td>
          <td><input type="number" v-model.number="item.amount" /></td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button class="btn btn-edit" @click="toggleEditMenu">수정</button>
      <button v-if="showEditMenu" class="btn btn-add" @click="addItem">추가</button>
      <button v-if="showEditMenu" class="btn btn-delete" @click="toggleDeleteMode">
        {{ deleteMode ? '삭제 취소' : '삭제' }}
      </button>
      <button
        v-if="deleteMode && transactions.some((t) => t.selected)"
        class="btn btn-delete"
        @click="deleteSelectedItems"
      >
        선택 항목 삭제
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useBudgetStore } from '@/stores/budget';

const manualBalanceInput = ref(0);
const manualBalance = ref(0);
const actualIncome = ref([]);
const actualSpending = ref([]);
const housing = ref([]);

const transactions = ref([]);
const deleteMode = ref(false);

const API_URL = 'http://localhost:3001/management';
const TX_URL = 'http://localhost:3001/transactions';

const fetchBudget = async () => {
  const res = await axios.get(API_URL);
  const data = res.data[0];
  if (data) {
    manualBalance.value = data.manualBalance;
    actualIncome.value = data.actualIncome;
    actualSpending.value = data.actualSpending;
    housing.value = data.housing;

    budgetStore.setBudgetData(actualIncome.value, actualSpending.value);
  }
};
const fetchTransactions = async () => {
  const res = await axios.get(TX_URL);
  transactions.value = res.data.map((tx) => ({ ...tx, selected: false }));
};
onMounted(() => {
  fetchBudget();
  fetchTransactions();
});

const budgetStore = useBudgetStore();

const saveBudget = async () => {
  const payload = {
    id: 1,
    manualBalance: manualBalance.value,
    actualIncome: actualIncome.value,
    actualSpending: actualSpending.value,
    housing: housing.value,
  };
  await axios.put(`${API_URL}/1`, payload);

  budgetStore.setBudgetData(actualIncome.value, actualSpending.value);

  alert('저장 완료!');
};

const addItem = () => {
  transactions.value.push({
    id: Date.now(),
    date: new Date().toISOString().slice(0, 10),
    desc: '',
    amount: 0,
    selected: false,
  });
};
const toggleDeleteMode = () => {
  deleteMode.value = !deleteMode.value;
};
const deleteSelectedItems = async () => {
  const confirmed = confirm('선택한 항목을 삭제하시겠습니까?');
  if (!confirmed) return;
  const toDelete = transactions.value.filter((t) => t.selected);
  for (const tx of toDelete) {
    await axios.delete(`${TX_URL}/${tx.id}`);
  }
  await fetchTransactions();
  deleteMode.value = false;
};

const setManualBalance = () => {
  manualBalance.value = manualBalanceInput.value;
  saveBudget();
};
const actualIncomeTotal = computed(() => actualIncome.value.reduce((sum, item) => sum + item.amount, 0));
const actualSpendingTotal = computed(() => actualSpending.value.reduce((sum, item) => sum + item.amount, 0));

const showEditIncomeMenu = ref(false);
const toggleIncomeMenu = () => (showEditIncomeMenu.value = !showEditIncomeMenu.value);
const addIncome = () => actualIncome.value.push({ name: '', amount: 0 });
const deleteIncome = () => actualIncome.value.pop();

const showEditSpendingMenu = ref(false);
const toggleSpendingMenu = () => (showEditSpendingMenu.value = !showEditSpendingMenu.value);
const addSpending = () => actualSpending.value.push({ name: '', amount: 0 });
const deleteSpending = () => actualSpending.value.pop();

const showEditHousingMenu = ref(false);
const toggleHousingMenu = () => (showEditHousingMenu.value = !showEditHousingMenu.value);
const addHousing = () => housing.value.push({ name: '', actual: 0 });
const deleteHousing = () => housing.value.pop();

const showEditMenu = ref(false);
const toggleEditMenu = () => (showEditMenu.value = !showEditMenu.value);
</script>

<style scoped>
.management {
  max-width: 900px;
  margin: 2rem auto;
  font-family: 'Segoe UI', sans-serif;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
}
h2 {
  font-size: 28px;
  color: #003366;
  margin-bottom: 1rem;
  text-align: center;
}
h3 {
  margin-top: 2rem;
  color: #003366;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
}
.summary-card {
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #ffc400;
}
.summary-card p {
  margin: 0.5rem 0;
  font-weight: 500;
  color: #333;
}
.budget-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.budget-table th {
  background-color: #ffc400;
  padding: 10px;
  text-align: center;
  color: white;
  font-weight: bold;
  border: 1px solid #e0e0e0;
}
.budget-table td {
  border: 1px solid #eee;
  padding: 8px;
  text-align: right;
  background-color: #fff;
}
.budget-table td:first-child {
  text-align: left;
}
.total-row {
  background-color: #fff8e1;
  font-weight: bold;
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
