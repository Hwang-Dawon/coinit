<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

import { computed } from 'vue';
import { useBudgetStore } from '@/stores/budget';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const budget = useBudgetStore();

const chartData = computed(() => ({
  labels: budget.actualSpending.map((item) => item.name),
  datasets: [
    {
      label: '지출 금액',
      data: budget.actualSpending.map((item) => item.amount),
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
};
</script>

<template>
  <div class="box chart-box">
    <h4>📊 카테고리별 지출</h4>
    <div class="chart-wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
