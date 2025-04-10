<template>
  <div class="record-container">
    <!-- ✅ 토스트 메시지 -->
    <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>

    <form @submit.prevent="onSubmit">
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

      <!-- 완료 버튼 -->
      <div class="top-bar">
        <div></div>
        <button type="submit">완료</button>
      </div>

      <!-- ✅ 라벨과 함께 -->
      <label class="form-label">항목</label>
      <input v-model="form.description" required />

      <label class="form-label">금액</label>
      <input v-model.number="form.amount" type="number" min="1" required />

      <label class="form-label">날짜</label>
      <input v-model="form.date" type="date" required />

      <label class="form-label">카테고리</label>
      <select v-model="form.category" required>
        <option disabled value="">카테고리</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>

      <label class="form-label">메모</label>
      <textarea v-model="form.memo" placeholder="메모"></textarea>
    </form>

    <hr />
    <h3>최근 거래내역 (지출, 수입)</h3>
    <table class="transaction-table" v-if="recent.length">
      <thead>
        <tr>
          <th>날짜</th>
          <th>유형</th>
          <th>카테고리</th>
          <th>금액</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in recent" :key="item.id">
          <td>{{ item.date }}</td>
          <td>
            <strong>{{ item.type === 'income' ? '수입' : '지출' }}</strong>
          </td>
          <td>{{ item.category || '-' }}</td>
          <td>
            <strong>{{ item.amount.toLocaleString() }}원</strong>
          </td>
          <td>
            <router-link :to="`/record/${item.id}`" style="color: blue"
              >[수정]</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no-data">최근 거래내역이 없습니다.</p>
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
const toastMessage = ref('');

const showToast = (msg) => {
  toastMessage.value = msg;
  setTimeout(() => (toastMessage.value = ''), 2000);
};

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
  recent.value = res.data
    .sort((a, b) => b.date.localeCompare(a.date))
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

const isValidDate = (dateStr) => {
  const today = new Date();
  const inputDate = new Date(dateStr);
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  return inputDate <= today;
};

const onSubmit = async () => {
  if (form.value.amount <= 0) {
    showToast('금액은 0보다 커야 합니다.');
    return;
  }

  if (!isValidDate(form.value.date)) {
    showToast('날짜는 오늘보다 같거나 이전 날짜만 가능합니다.');
    return;
  }

  const nextId = await getNextId();

  await axios.post('http://localhost:3001/transactions', {
    id: nextId,
    ...form.value,
  });

  showToast('기록 완료!');
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
  margin: 40px auto;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
}

.toast {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  z-index: 10;
  animation: fadein 0.3s ease;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

hr {
  margin: 30px 0;
}

h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.transaction-table th,
.transaction-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.transaction-table th {
  font-weight: bold;
  background-color: #f9f9f9;
}

.no-data {
  margin-top: 20px;
  text-align: center;
  color: #888;
}
</style>
