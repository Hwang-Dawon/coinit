<template>
  <div class="record-container">
    <form @submit.prevent="updateRecord">
      <!-- 지출/수입 선택 버튼 -->
      <div class="type-buttons">
        <button
          type="button"
          :class="{ active: form.type === 'expense' }"
          @click="form.type = 'expense'"
        >
          지출
        </button>
        <button
          type="button"
          :class="{ active: form.type === 'income' }"
          @click="form.type = 'income'"
        >
          수입
        </button>
      </div>

      <!-- 상단 수정/삭제 버튼 -->
      <div class="top-bar">
        <div></div>
        <div class="btn-group">
          <button type="submit">수정하기</button>
          <button type="button" class="delete-btn" @click="deleteRecord">
            삭제하기
          </button>
        </div>
      </div>

      <label class="form-label">항목</label>
      <input v-model="form.description" type="text" required />

      <label class="form-label">금액</label>
      <input v-model.number="form.amount" type="number" min="1" required />

      <label class="form-label">날짜</label>
      <input v-model="form.date" type="date" required />

      <label class="form-label">카테고리</label>
      <select v-model="form.category" required>
        <option disabled value="">카테고리 선택</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>

      <label class="form-label">메모</label>
      <textarea v-model="form.memo" placeholder="메모"></textarea>
    </form>
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

const fetchRecord = async () => {
  try {
    const { id } = route.params;
    const res = await axios.get(`http://localhost:3001/transactions/${id}`);
    form.value = {
      description: res.data.description,
      amount: res.data.amount,
      date: res.data.date,
      type: res.data.type,
      category: res.data.category,
      memo: res.data.memo || '',
    };
  } catch (err) {
    alert('데이터를 불러오는 데 실패했습니다.');
    console.error(err);
  }
};

const fetchCategories = async () => {
  const url =
    form.value.type === 'income' ? '/incomeCategory' : '/expenseCategory';
  const res = await axios.get(`http://localhost:3001${url}`);
  categories.value = res.data;
};

const isValidDate = (dateStr) => {
  const today = new Date();
  const inputDate = new Date(dateStr);
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  return inputDate <= today;
};

const updateRecord = async () => {
  const { id } = route.params;

  if (form.value.amount <= 0) {
    alert('금액은 0보다 커야 합니다.');
    return;
  }

  if (!isValidDate(form.value.date)) {
    alert('날짜는 오늘보다 같거나 이전 날짜만 가능합니다.');
    return;
  }

  await axios.put(`http://localhost:3001/transactions/${id}`, form.value);
  alert('수정 완료!');
  router.push('/record');
};

const deleteRecord = async () => {
  const { id } = route.params;
  const confirmDelete = confirm('정말 삭제하시겠습니까?');
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3001/transactions/${id}`);
    alert('삭제 완료!');
    router.push('/record');
  } catch (err) {
    alert('삭제 중 오류가 발생했습니다.');
    console.error(err);
  }
};

watch(() => form.value.type, fetchCategories);

onMounted(async () => {
  await fetchRecord();
  await fetchCategories();
});
</script>

<style scoped>
.record-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-group {
  display: flex;
  gap: 10px;
}

form input,
form select,
form textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
}

form textarea {
  resize: vertical;
  min-height: 80px;
}

.form-label {
  font-weight: 600;
  font-size: 15px;
  margin: 6px 0 4px;
  display: block;
}

.type-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.type-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-buttons button.active {
  background-color: #333;
  color: white;
  font-weight: bold;
  border-color: #333;
}

.type-buttons button:hover {
  background-color: #eee;
}

button[type='submit'] {
  padding: 8px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

button[type='submit']:hover {
  background-color: #f0f0f0;
}

.delete-btn {
  border: 1px solid #dc3545;
  background-color: white;
  color: #dc3545;
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
  transition: 0.2s;
}

.delete-btn:hover {
  background-color: #f8d7da;
}
</style>
