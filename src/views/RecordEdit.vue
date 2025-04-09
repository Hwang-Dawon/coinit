<template>
  <div class="record-edit-container">
    <h2>기록 수정</h2>

    <form @submit.prevent="updateRecord">
      <label>항목</label>
      <input v-model="form.description" type="text" required />

      <label>금액</label>
      <input v-model.number="form.amount" type="number" required />

      <label>날짜</label>
      <input v-model="form.date" type="date" required />

      <label>유형</label>
      <select v-model="form.type">
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>

      <label>카테고리</label>
      <select v-model="form.category">
        <option disabled value="">카테고리 선택</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>

      <label>메모</label>
      <textarea v-model="form.memo"></textarea>

      <button type="submit">수정하기</button>
    </form>

    <button @click="deleteRecord" class="delete-btn">삭제하기</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const form = ref({
  description: '',
  amount: 0,
  date: '',
  type: 'expense',
  category: '',
  memo: '',
});

const categories = ref([]);

// ✅ 기존 데이터 불러오기
const fetchRecord = async () => {
  const { id } = route.params;
  const res = await axios.get(`http://localhost:3001/transactions/${id}`);
  const data = res.data;

  form.value = {
    description: data.description,
    amount: data.amount,
    date: data.date,
    type: data.type,
    category: data.category,
    memo: data.memo || '',
  };
};

// ✅ 카테고리 불러오기 (유형에 따라 분기)
const fetchCategories = async () => {
  const url =
    form.value.type === 'income' ? '/incomeCategory' : '/expenseCategory';
  const res = await axios.get(`http://localhost:3001${url}`);
  categories.value = res.data;
};

// ✅ 수정 요청
const updateRecord = async () => {
  const { id } = route.params;
  await axios.put(`http://localhost:3001/transactions/${id}`, form.value);
  alert('수정 완료!');
  router.push('/record');
};

// ✅ 삭제 요청
const deleteRecord = async () => {
  const { id } = route.params;
  const confirmDelete = confirm('정말 삭제하시겠습니까?');
  if (confirmDelete) {
    await axios.delete(`http://localhost:3001/transactions/${id}`);
    alert('삭제 완료!');
    router.push('/record');
  }
};

// ✅ 유형 바뀌면 카테고리 다시 불러오기
watch(() => form.value.type, fetchCategories);

onMounted(async () => {
  await fetchRecord();
  await fetchCategories();
});
</script>

<style scoped>
.record-edit-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 10px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input,
select,
textarea {
  display: block;
  width: 100%;
  margin-top: 4px;
  padding: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  margin-top: 15px;
  padding: 8px 12px;
  font-size: 16px;
}

.delete-btn {
  background-color: red;
  color: white;
  border: none;
  margin-top: 10px;
}
</style>
