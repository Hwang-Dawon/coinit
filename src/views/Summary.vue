<template>
  <div class="center-container">
    <div class="summary">
      <h2 class="title">월별 요약</h2>
      <div class="month-summary">
        <p class="income">총 수입: {{ totalIncome }}원</p>
        <p class="expense">총 지출: {{ totalExpense }}원</p>
      </div>

      <h2 class="summary-title">카테고리별 지출 현황</h2>
      <div class="category-summary">
        <div class="pie-chart" :style="getPieChartStyle()">
          <span class="percentage-label">
            <div v-if="highestCategory">
              {{ highestCategory.category }}: {{ highestCategory.percentage }}%
            </div>
            <div v-else>No Data</div>
          </span>
        </div>
        <div v-for="(item, category) in categorySummary" :key="category">
          {{ category }}: {{ item.percentage }}%
        </div>
      </div>

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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
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
  let totalExpenseAmount = 0;

  transactions.value.forEach((transaction) => {
    if (transaction.type === 'expense') {
      const category = transaction.category;
      const amount = transaction.amount;
      totalExpenseAmount += amount;

      if (summary[category]) {
        summary[category].amount += amount;
      } else {
        summary[category] = { amount: amount };
      }
    }
  });

  for (const category in summary) {
    summary[category].percentage = (
      (summary[category].amount / totalExpenseAmount) *
      100
    ).toFixed(1);
  }

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

const highestCategory = computed(() => {
  if (Object.keys(categorySummary.value).length === 0) {
    return null;
  }

  let maxCategory = null;
  let maxPercentage = 0;

  for (const category in categorySummary.value) {
    const percentage = parseFloat(categorySummary.value[category].percentage);
    if (percentage > maxPercentage) {
      maxCategory = { category: category, percentage: percentage };
      maxPercentage = percentage;
    }
  }

  return maxCategory;
});

const getPieChartStyle = () => {
  const summaryValues = Object.values(categorySummary.value);

  if (summaryValues.length === 0) {
    return {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      margin: '20px auto',
      backgroundColor: '#f0f0f0', // No data 배경색
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#888',
      fontSize: '16px',
    };
  }

  const total = summaryValues.reduce((acc, val) => acc + val.amount, 0);
  let startAngle = 0;
  let gradient = '';

  Object.entries(categorySummary.value).forEach(([category, item]) => {
    const amount = item.amount;
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
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 화면 높이만큼 최소 높이 설정 */
  padding: 20px; /* 내용이 너무 붙지 않도록 padding 추가 */
}

.summary {
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center; /* 내용 중앙 정렬 */
}

.title {
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
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
  font-size: 20px;
  font-weight: bold;
}

/* 카테고리별 지출현황 */
.category-summary {
  margin: 20px auto;
  text-align: center; /* 퍼센트 정보 중앙 정렬 */
}

.pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 20px auto;
  position: relative; /* percentage-label absolute positioning 기준 */
}

/* 파이차트 중앙에 들어가는 퍼센트 */
.percentage-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

/* 카테고리별 지출내역 */
.category-detail {
  border: 1px solid;
  padding: 20px;
  margin-top: 
