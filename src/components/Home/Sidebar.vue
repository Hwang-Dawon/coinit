<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToMypage = () => router.push('/mypage');
const goToTransactions = () => router.push('/transactions');
const goToManagement = () => router.push('/management');
const goToSummary = () => router.push('/summary');
</script>

<template>
  <aside class="sidebar">
    <button class="sidebar-btn" @click="goToMypage">마이페이지</button>
    <button class="sidebar-btn" @click="goToTransactions">수입/지출 내역</button>
    <button class="sidebar-btn" @click="goToManagement">재정 관리</button>
    <button class="sidebar-btn" @click="goToSummary">카테고리</button>
  </aside>
</template>
