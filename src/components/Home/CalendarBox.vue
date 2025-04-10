<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';

const selectedDate = ref(new Date());
const emit = defineEmits(['update:selectedDate']);

const transactions = ref([]);

watch(selectedDate, (newDate) => {
  const formatted = newDate.toISOString().slice(0, 10);
  emit('update:selectedDate', formatted);
});

const fetchTransactions = async () => {
  const res = await axios.get('http://localhost:3001/transactions');
  transactions.value = res.data;
};
onMounted(() => {
  fetchTransactions();
});

const selectedDateFormatted = computed(() => selectedDate.value.toISOString().slice(0, 10));

const filteredTransactions = computed(() => transactions.value.filter((tx) => tx.date === selectedDateFormatted.value));
</script>

<template>
  <div class="calendar-box">
    <div class="datepicker-wrapper">
      <Datepicker v-model="selectedDate" inline />
    </div>

    <div class="calendar-transactions">
      <h4>{{ selectedDateFormatted }} 거래 내역</h4>
      <ul>
        <li v-for="tx in filteredTransactions" :key="tx.id">
          {{ tx.description }} - ₩{{ tx.amount.toLocaleString() }}
        </li>
        <li v-if="filteredTransactions.length === 0" class="empty">📭 거래 내역이 없습니다.</li>
      </ul>
    </div>
  </div>
</template>
