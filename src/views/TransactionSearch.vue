<template>
  <div class="container">
    <h2>거래 내역 조회</h2>

    <div class="filters">
      <input v-model="filter.from" type="date" />
      <input v-model="filter.to" type="date" />

      <select v-model="filter.type">
        <option value="">전체</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>

      <select v-model="filter.category">
        <option value="">전체 카테고리</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>

      <button @click="applyFilter">조회</button>
    </div>

    <ul class="list">
      <li v-for="tx in filteredTransactions" :key="tx.id">
        {{ tx.date }} | {{ tx.type }} | {{ tx.category }} | {{ tx.amount }}원 |
        {{ tx.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactions: [],
      filteredTransactions: [],
      filter: {
        from: '',
        to: '',
        type: '',
        category: '',
      },
    };
  },
  computed: {
    categories() {
      const all = this.transactions.map((tx) => tx.category);
      return [...new Set(all)];
    },
  },
  methods: {
    async fetchTransactions() {
      const res = await axios.get('http://localhost:3001/transactions');
      this.transactions = res.data;
      this.filteredTransactions = res.data;
    },
    applyFilter() {
      this.filteredTransactions = this.transactions.filter((tx) => {
        const date = new Date(tx.date);
        const from = this.filter.from ? new Date(this.filter.from) : null;
        const to = this.filter.to ? new Date(this.filter.to) : null;

        return (
          (!from || date >= from) &&
          (!to || date <= to) &&
          (!this.filter.type || tx.type === this.filter.type) &&
          (!this.filter.category || tx.category === this.filter.category)
        );
      });
    },
  },
  created() {
    this.fetchTransactions();
  },
};
</script>

<style scoped></style>
