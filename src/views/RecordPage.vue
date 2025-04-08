<template>
  <div class="record-container">
    <h2 class="title">지출 / 수입</h2>

    <form @submit.prevent="onSubmit">
      <label>지출명 :</label>
      <input v-model="form.description" />

      <label>지출 금액 :</label>
      <input v-model.number="form.amount" type="number" />

      <label>지출 일시 :</label>
      <input v-model="form.date" type="date" />

      <label>지출 카테고리 :</label>
      <select v-model="form.category">
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>

      <label>메모 :</label>
      <textarea v-model="form.memo" />

      <div class="btns">
        <button type="button" @click="clearForm">삭제</button>
        <button type="submit">완료</button>
      </div>
    </form>

    <div class="recent-box">
      <h3>최근 거래내역 (지출, 수입)</h3>
      <div v-for="(items, category) in groupedByCategory" :key="category">
        <h4>[{{ category }}]</h4>
        <ul>
          <li v-for="item in items" :key="item.id">
            {{ item.date }} - {{ typeLabel[item.type] }} -
            {{ formatAmount(item.amount) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
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

const formatAmount = (value) => value.toLocaleString('ko-KR') + '원';

const groupedByCategory = computed(() => {
  const grouped = {};
  for (const item of recent.value) {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  }
  return grouped;
});

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
  alert('완료!');
  fetchRecent();
  clearForm();
};

const clearForm = () => {
  form.value = {
    description: '',
    amount: 0,
    date: '',
    type: 'expense',
    category: '',
    memo: '',
  };
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
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

input,
select,
textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  font-size: 1rem;
}

label {
  margin-top: 10px;
  font-weight: bold;
  display: block;
}

.btns {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.recent-box {
  margin-top: 30px;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
}
</style>
