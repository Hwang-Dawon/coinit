<template>
  <div class="record-container">
    <h2>지출 / 수입 기록</h2>

    <div class="button-row">
      <button @click="onClear">삭제</button>
      <button @click="onSubmit">완료</button>
    </div>

    <form @submit.prevent="onSubmit">
      <input v-model="form.description" placeholder="지출명" />
      <input
        v-model.number="form.amount"
        type="number"
        placeholder="지출 금액"
      />
      <input v-model="form.date" type="date" />

      <select v-model="form.type">
        <option value="expense">지출</option>
        <option value="income">수입</option>
      </select>

      <select v-model="form.category">
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>

      <textarea v-model="form.memo" placeholder="메모"></textarea>
    </form>

    <hr />
    <h3>최근 거래내역 (지출, 수입)</h3>
    <ul class="recent-list">
      <li v-for="item in recent" :key="item.id">
        <span>{{ item.date }}</span>
        <span class="type">{{ typeLabel[item.type] }}</span>
        <span>{{ item.category }}</span>
        <span class="amount">{{ formatAmount(item.amount) }}</span>
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

const typeLabel = {
  income: '수입',
  expense: '지출',
};

const fetchCategories = async () => {
  const url =
    form.value.type === 'income' ? '/incomeCategory' : '/expenseCategory';
  const res = await axios.get(`http://localhost:3001${url}`);
  categories.value = res.data;
};

const fetchRecent = async () => {
  const res = await axios.get(
    'http://localhost:3001/transactions?_sort=id&_order=desc&_limit=5'
  );
  recent.value = res.data;
};

const onSubmit = async () => {
  await axios.post('http://localhost:3001/transactions', {
    ...form.value,
  });
  alert('기록 완료!');
  fetchRecent();
};

const onClear = () => {
  form.value = {
    description: '',
    amount: 0,
    date: '',
    type: 'expense',
    category: '',
    memo: '',
  };
};

const formatAmount = (num) => {
  return Number(num).toLocaleString() + '원';
};

watch(() => form.value.type, fetchCategories);
onMounted(() => {
  fetchCategories();
  fetchRecent();
});
</script>

<style scoped>
.record-container {
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
}

.record-container h2 {
  text-align: center;
  margin-top: 16px;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 8px;
}

.button-row button {
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
}

input,
select,
textarea {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

/* 거래 리스트 */
.recent-list {
  list-style: none;
  padding: 0;
  margin-top: 16px;
  border-top: 2px solid #ccc;
}

.recent-list li {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed #ddd;
  font-size: 0.95rem;
}

.recent-list li span {
  display: inline-block;
  padding: 0 6px;
}

.recent-list li span:nth-child(1) {
  width: 100px;
}
.recent-list li span:nth-child(2) {
  width: 60px;
  font-weight: bold;
}
.recent-list li span:nth-child(3) {
  width: 80px;
}
.recent-list li span:nth-child(4) {
  width: 100px;
  text-align: right;
  font-weight: bold;
}
</style>
