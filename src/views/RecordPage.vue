<template>
  <div class="record-container">
    <div class="top-bar">
      <h2>지출 / 수입 기록</h2>
      <div class="btn-group">
        <button @click="resetForm">삭제</button>
        <button @click="onSubmit">완료</button>
      </div>
    </div>

    <form @submit.prevent="onSubmit">
      <input v-model="form.description" placeholder="지출명" />
      <input
        v-model.number="form.amount"
        type="number"
        placeholder="지출 금액"
      />
      <input v-model="form.date" type="date" placeholder="지출 일시" />

      <select v-model="form.type">
        <option value="expense">지출</option>
        <option value="income">수입</option>
      </select>

      <select v-model="form.category">
        <option disabled value="">카테고리</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>

      <textarea v-model="form.memo" placeholder="메모"></textarea>
    </form>

    <hr />
    <h3>최근 거래내역 (지출, 수입)</h3>
    <ul class="transaction-list">
      <li v-for="item in recent" :key="item.id">
        {{ item.date }} -
        <strong>{{ item.type === 'income' ? '수입' : '지출' }}</strong> -
        {{ item.category }} -
        <strong>{{ item.amount.toLocaleString() }}원</strong>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const form = ref({
  description: '',
  amount: 0,
  date: '',
  type: 'expense',
  category: '',
  memo: '',
});

const categories = ref([]);
const recent = ref([]);

// 🟢 id 중복 방지
const getNextId = async () => {
  const res = await axios.get('http://localhost:3001/transactions');
  const ids = res.data.map((item) => item.id || 0);
  return Math.max(...ids, 0) + 1;
};

const fetchCategories = async () => {
  const url =
    form.value.type === 'income' ? '/incomeCategory' : '/expenseCategory';
  const res = await axios.get(`http://localhost:3001${url}`);
  categories.value = res.data;
};

const fetchRecent = async () => {
  const res = await axios.get('http://localhost:3001/transactions');
  // 날짜 기준 내림차순 정렬 후 상위 5개
  recent.value = res.data
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
};

const resetForm = () => {
  form.value = {
    description: '',
    amount: 0,
    date: '',
    type: 'expense',
    category: '',
    memo: '',
  };
};

const onSubmit = async () => {
  const nextId = await getNextId();

  await axios.post('http://localhost:3001/transactions', {
    id: nextId,
    ...form.value,
  });

  alert('기록 완료!');
  resetForm();
  fetchRecent();
};

watch(() => form.value.type, fetchCategories);
onMounted(() => {
  fetchCategories();
  fetchRecent();
});
</script>

<style scoped>
.record-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 10px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-group button {
  margin-left: 5px;
}

form input,
form select,
form textarea {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 6px;
  font-size: 16px;
}

.transaction-list {
  margin-top: 10px;
  padding-left: 0;
  list-style: none;
}

.transaction-list li {
  padding: 6px 0;
  border-bottom: 1px dotted #ccc;
}
</style>
