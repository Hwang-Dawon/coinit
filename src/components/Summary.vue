<template>
  <div class="summary">
    <h2 class="title">월별 요약</h2>
    <div class="month-summary">
      <p class="income">총 수입: {{ totalIncome }}원</p>
      <p class="expense">총 지출: {{ totalExpense }}원</p>
    </div>

    <h2 class="summary-title">카테고리별 지출 현황</h2>
    <div class="category-summary" :style="getPieChartStyle()"></div>

    <h2 class="detail-title">카테고리별 지출 내역</h2>
    <div class="category-detail">
      <div v-for="item in categoryDetails" :key="item.category">
        <h3>{{ item.category }}</h3>
        <ul>
          <li v-for="transaction in item.transactions" :key="transaction.id">
            {{ transaction.date }} - {{ transaction.description }}:
            {{ transaction.amount }}원
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const totalIncome = ref(0);
const totalExpense = ref(0);
const transactions = ref([]);
const categorySummary = ref({});
const categoryDetails = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3001/transactions');
    transactions.value = response.data;
    calculateSummary();
    calculateCategorySummary();
    calculateCategoryDetails();
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
});

const calculateSummary = () => {
  totalIncome.value = 0;
  totalExpense.value = 0;

  transactions.value.forEach((transaction) => {
    if (transaction.type === 'income') {
      totalIncome.value += transaction.amount;
    } else if (transaction.type === 'expense') {
      totalExpense.value += transaction.amount;
    }
  });
};

const calculateCategorySummary = () => {
  const summary = {};

  transactions.value.forEach((transaction) => {
    if (transaction.type === 'expense') {
      const category = transaction.category;
      if (summary[category]) {
        summary[category] += transaction.amount;
      } else {
        summary[category] = transaction.amount;
      }
    }
  });

  categorySummary.value = summary;
};

const calculateCategoryDetails = () => {
  const details = [];

  for (const category in categorySummary.value) {
    const categoryTransactions = transactions.value.filter(
      (transaction) =>
        transaction.type === 'expense' && transaction.category === category
    );
    details.push({ category, transactions: categoryTransactions });
  }

  categoryDetails.value = details;
};

const getPieChartStyle = () => {
  const total = Object.values(categorySummary.value).reduce(
    (acc, val) => acc + val,
    0
  );
  let startAngle = 0;
  let gradient = '';

  Object.entries(categorySummary.value).forEach(([category, amount]) => {
    const sliceAngle = (amount / total) * 360;
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // 랜덤 색상 생성
    gradient += `, ${color} ${startAngle}deg ${startAngle + sliceAngle}deg`;
    startAngle += sliceAngle;
  });

  return {
    backgroundImage: `conic-gradient(white 0deg${gradient})`,
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    margin: '20px auto',
  };
};
</script>

<!-- 스타일 부분 -->
<style scoped>
.summary {
  text-align: center;
}

.title {
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  text-align: center;
  left: 37%;
}

/* 월별 요약 */
.month-summary {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

/* 총 수입과 지출 */
.income,
.expense {
  border: 1px solid;
  padding: 30px 30px;
  border-radius: 10px;
  width: 150px;
  margin: 0 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  margin: 0;
}
.summary-title,
.detail-title {
  font-size: 14px;
}

/* 카테고리별 지출현황 */
.category-summary {
  background-color: yellow;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 20px auto;
}

/* 카테고리별 지출내역 */
.category-detail {
  border: 1px solid;
  padding: 20px;
  margin-top: 30px;
  min-height: 100px;
}
</style>
