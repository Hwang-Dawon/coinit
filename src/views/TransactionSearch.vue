<template>
  <div class="container">
    <h2>거래 내역 조회</h2>
    <!-- 필터기능 -->
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
      <!-- 조회버튼 -->
      <button @click="applyFilter">조회</button>
      <button @click="toggleSort">날짜순 정렬: {{ sortOrder }}</button>
    </div>
    <!-- 거래목록 -->
    <ul class="list">
      <li v-for="tx in paginatedList" :key="tx.id">
        {{ tx.date }} | {{ tx.type }} | {{ tx.category }} | {{ tx.amount }}원 |
        {{ tx.description }} | {{ tx.memo }}
      </li>
    </ul>
    <!-- 페이지번호 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        다음
      </button>
    </div>
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
      currentPage: 1,
      itemsPerPage: 5,
      sortOrder: '내림차순', // 또는 오름차순
    };
  },
  computed: {
    categories() {
      const all = this.transactions.map((tx) => tx.category);
      return [...new Set(all)];
    },
    totalPages() {
      return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    },
    paginatedList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTransactions.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async fetchTransactions() {
      const res = await axios.get('http://localhost:3001/transactions');
      this.transactions = res.data;
      this.applyFilter(); // 첫 렌더링 시 필터+정렬 반영
    },
    applyFilter() {
      let result = this.transactions.filter((tx) => {
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

      // 정렬 적용
      result.sort((a, b) => {
        return this.sortOrder === '오름차순'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      });

      this.filteredTransactions = result;
      this.currentPage = 1; // 필터 바뀌면 페이지 초기화
    },
    toggleSort() {
      this.sortOrder = this.sortOrder === '오름차순' ? '내림차순' : '오름차순';
      this.applyFilter();
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
  created() {
    this.fetchTransactions();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
.filters {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.filters input,
.filters select,
.filters button {
  padding: 5px;
  font-size: 14px;
}
.list {
  list-style: none;
  padding: 0;
}
.list li {
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
