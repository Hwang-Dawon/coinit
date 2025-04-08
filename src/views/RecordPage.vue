<template>
  <div class="record-container">
    <h2>{{ titleText }}</h2>

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
        <option disabled value="">카테고리 선택</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>

      <textarea v-model="form.memo" placeholder="메모"></textarea>
    </form>

    <hr />
    <h3>최근 거래내역 (지출, 수입)</h3>
    <ul class="recent-list">
      <li v-for="item in recent.slice().reverse()" :key="item.id">
        <span>{{ item.date }}</span>
        <span class="type">{{ typeLabel[item.type] }}</span>
        <span>{{ item.category }}</span>
        <span class="amount">{{ formatAmount(item.amount) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';

// 기본 입력값
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

// 상단 제목 동적 변경
const titleText = computed(() => {
  return form.value.type === 'income' ? '수입 기록' : '지출 기록';
});

// 카테고리 불러오기
const fetchCategories = async () => {
  const url =
    form.value.type === 'income' ? '/incomeCategory' : '/expenseCategory';
  const res = await axios.get(`http://localhost:3001${url}`);
  categories.value = res.data;
};

// 최근 거래 불러오기
const fetchRecent = async () => {
  const res = await axios.get(
    'http://localhost:3001/transactions?_sort=id&_order=desc&_limit=5'
  );
  recent.value = res.data;
};

// 기록 저장
const onSubmit = async () => {
  if (!form.value.category) {
    alert('카테고리를 선택해주세요.');
    return;
  }

  await axios.post('http://localhost:3001/transactions', {
    ...form.value,
  });
  alert('기록 완료!');
  fetchRecent();
};

// 입력 초기화
const onClear = () => {
  form.value = {
    description: '',
    amount: 0,
    date: '',
    type: 'expense',
    category: '',
    memo: '',
  };
  fetchCategories();
};

// 금액 포맷
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

h2 {
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

/* 최근 거래내역 스타일 */
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
