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
        <tr>
          <th>항목</th>
          <th>지출 내역</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in housing" :key="'fixed' + index">
          <td>{{ item.name }}</td>
          <td>₩{{ item.actual.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

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
          <td>{{ item.name }}</td>
          <td>₩{{ item.amount.toLocaleString() }}</td>
        </tr>
        <tr class="total-row">
          <td><strong>총 수입</strong></td>
          <td>
            <strong>₩{{ actualIncomeTotal.toLocaleString() }}</strong>
          </td>
        </tr>
      </tbody>
    </table>

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
          <td>{{ item.name }}</td>
          <td>₩{{ item.amount.toLocaleString() }}</td>
        </tr>
        <tr class="total-row">
          <td><strong>총 지출</strong></td>
          <td>
            <strong>₩{{ actualSpendingTotal.toLocaleString() }}</strong>
          </td>
        </tr>
      </tbody>
    </table>

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
          <td>{{ item.date }}</td>
          <td>{{ item.desc }}</td>

          <td :class="{ negative: item.amount < 0 }">
            ₩{{ item.amount.toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 추가, 수정, 삭제 버튼 -->
    <div class="button-group">
  <button class="btn btn-add" @click="addItem">추가</button>
  <button class="btn btn-edit" @click="editItem">수정</button>
  <button class="btn btn-delete" @click="deleteItem">삭제</button>
</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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

const actualBalance = computed(() =>
  actualIncomeTotal.value - actualHousingTotal.value
)


const addItem = () => {
  alert('항목을 추가합니다.');
};

const editItem = () => {
  alert('항목을 수정합니다.');
};

const deleteItem = () => {
  const confirmed = confirm('정말 삭제하시겠습니까?');
  if (confirmed) {
    alert('삭제되었습니다.');
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

.negative {
  color: #d32f2f;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 1.5rem;
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
</style>
