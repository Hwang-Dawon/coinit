<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useRouter } from 'vue-router'; // vue-router 추가

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const expensesByCategory = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3001/transactions');
    const allTransactions = res.data;

    const expenseOnly = allTransactions.filter((t) => t.type === 'expense');

    const grouped = {};
    expenseOnly.forEach((item) => {
      grouped[item.category] = (grouped[item.category] || 0) + item.amount;
    });

    expensesByCategory.value = Object.entries(grouped).map(([category, amount]) => ({
      category,
      amount,
    }));
  } catch (err) {
    console.error('지출 데이터 불러오기 실패:', err);
  }
});

const chartData = computed(() => ({
  labels: expensesByCategory.value.map((item) => item.category),
  datasets: [
    {
      label: '지출 금액',
      data: expensesByCategory.value.map((item) => item.amount),
      backgroundColor: '#64b5f6',
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: '카테고리별 지출',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => '₩' + value.toLocaleString(),
      },
    },
  },
  onClick: (event, elements) => {
    if (elements.length > 0) {
      const clickedElementIndex = elements[0].index;
      const category = expensesByCategory.value[clickedElementIndex].category;
      router.push({ name: 'summary', params: { category: category } }); // summary route로 이동
    }
  },
};
</script>

<template>
  <div class="box chart-box">
    <h4>📊 카테고리별 지출</h4>
    <div class="chart-wrapper">
      <Bar :data="chartData" :options="chartOptions" @click="handleChartClick" />
    </div>
  </div>
</template>
