<script setup>
import Sidebar from '@/components/Home/Sidebar.vue';
import HeaderBar from '@/components/Home/HeaderBar.vue';
import ExpenseBox from '@/components/Home/ExpenseBox.vue';
import IncomeBox from '@/components/Home/IncomeBox.vue';
import ChartBox from '@/components/Home/ChartBox.vue';
import CalendarBox from '@/components/Home/CalendarBox.vue';
import BudgetBox from '@/components/Home/BudgetBox.vue';
</script>

<template>
  <div class="home-container">
    <HeaderBar />
    <div class="main-wrapper">
      <div class="sidebar">
        <Sidebar />
      </div>

      <div class="main-content">
        <div class="top-boxes">
          <IncomeBox class="box" />
          <ExpenseBox class="box" />
        </div>

        <ChartBox class="chart-box" />

        <div class="bottom-boxes">
          <CalendarBox class="box" />
          <BudgetBox class="box" />
        </div>
      </div>
    </div>
  </div>
</template>
