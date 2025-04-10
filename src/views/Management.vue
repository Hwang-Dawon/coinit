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

    <!-- 실제 월별 수입 -->
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
            <template v-if="deleteMode"> <input type="checkbox" v-model="item.selected" /><br /> </template>
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
import { ref, computed } from 'vue';

const today = new Date().toISOString().slice(0, 10);
const budget = ref(1000000);
const balance = ref(500000);

const manualBalanceInput = ref(0);

const manualBalance = ref(0);

const setManualBalance = () => {
  manualBalance.value = manualBalanceInput.value;
};

const actualIncome = ref([
  { name: '월급', amount: 4000000 },
  { name: '투잡 수입', amount: 300000 },
]);

const actualSpending = ref([
  { name: '식비', amount: 420000 },
  { name: '교통비', amount: 80000 },
  { name: '문화생활', amount: 160000 },
]);

const housing = ref([
  { name: '통신비', actual: 70000 },
  { name: '교통비', actual: 80000 },
  { name: '월세', actual: 400000 },
]);

const transactions = ref([
  { id: 1, date: new Date().toISOString().slice(0, 10), desc: '커피', amount: -4500 },
  { id: 2, date: new Date().toISOString().slice(0, 10), desc: '지하철', amount: -1250 },
]);

const actualIncomeTotal = computed(() => actualIncome.value.reduce((sum, item) => sum + item.amount, 0));
const actualSpendingTotal = computed(() => actualSpending.value.reduce((sum, item) => sum + item.amount, 0));
const actualHousingTotal = computed(() => housing.value.reduce((sum, item) => sum + item.actual, 0));
const actualBalance = computed(() => actualIncomeTotal.value - actualHousingTotal.value);

const showEditMenu = ref(false);
const toggleEditMenu = () => (showEditMenu.value = !showEditMenu.value);

const showEditHousingMenu = ref(false);
const toggleHousingMenu = () => (showEditHousingMenu.value = !showEditHousingMenu.value);

const showEditIncomeMenu = ref(false);
const toggleIncomeMenu = () => (showEditIncomeMenu.value = !showEditIncomeMenu.value);

const showEditSpendingMenu = ref(false);
const toggleSpendingMenu = () => (showEditSpendingMenu.value = !showEditSpendingMenu.value);

const addItem = () => {
  transactions.value.push({ id: Date.now(), date: new Date().toISOString().slice(0, 10), desc: '', amount: 0 });
};
const addIncome = () => actualIncome.value.push({ name: '', amount: 0 });
const deleteIncome = () => actualIncome.value.pop();

const addSpending = () => actualSpending.value.push({ name: '', amount: 0 });
const deleteSpending = () => actualSpending.value.pop();

const addHousing = () => housing.value.push({ name: '', actual: 0 });
const deleteHousing = () => housing.value.pop();

const deleteMode = ref(false);
const toggleDeleteMode = () => {
  deleteMode.value = !deleteMode.value;
  if (deleteMode.value) {
    transactions.value.forEach((item) => {
      if (item.selected === undefined) item.selected = false;
    });
  }
};

const deleteSelectedItems = () => {
  const confirmed = confirm('선택된 항목을 삭제하시겠습니까?');
  if (confirmed) {
    transactions.value = transactions.value.filter((item) => !item.selected);
    deleteMode.value = false;
  }
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

.negative {
  color: #d32f2f;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  border: none;
}

.btn-add {
  background-color: #007bff;
}

.btn-edit {
  background-color: #28a745;
}

.btn-delete {
  background-color: #dc3545;
}
input[type='text'],
input[type='number'],
input[type='date'] {
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
