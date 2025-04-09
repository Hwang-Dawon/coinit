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
      <Sidebar />
      <div class="main-content">
        <ChartBox />
        <div class="summary-row">
          <IncomeBox />
          <ExpenseBox />
          <div class="bottom-row">
            <CalendarBox />
            <BudgetBox />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
