<template>
  <div class="container">
    <h2>거래 내역 조회</h2>
    <!--  필터기능 -->
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

      <!--  메모 검색창 추가 -->
      <input v-model="filter.memo" placeholder="메모 검색" />

      <button @click="applyFilter">조회</button>
      <button @click="toggleSort">날짜순 정렬: {{ sortOrder }}</button>
    </div>

    <!-- 거래목록 -->
    <ul class="list">
      <li v-for="tx in paginatedList" :key="tx.id">
        {{ tx.date }} | {{ tx.type === 'income' ? '수입' : '지출' }} |
        {{ tx.category }} | {{ tx.amount }}원 | {{ tx.description }} |
        {{ tx.memo }}
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
        memo: '', // 🔥 메모 검색 필터 추가
      },
      currentPage: 1,
      itemsPerPage: 5,
      sortOrder: '내림차순',
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
      this.applyFilter();
    },
    applyFilter() {
      let result = this.transactions.filter((tx) => {
        const date = new Date(tx.date);
        const from = this.filter.from ? new Date(this.filter.from) : null;
        const to = this.filter.to ? new Date(this.filter.to) : null;

        // 🔥 메모 필터 키워드
        const memoKeyword = this.filter.memo.toLowerCase();

        return (
          (!from || date >= from) &&
          (!to || date <= to) &&
          (!this.filter.type || tx.type === this.filter.type) &&
          (!this.filter.category || tx.category === this.filter.category) &&
          (!this.filter.memo ||
            (tx.description &&
              tx.description.toLowerCase().includes(memoKeyword)) ||
            (tx.memo && tx.memo.toLowerCase().includes(memoKeyword)))
        );
      });

      // 정렬
      result.sort((a, b) =>
        this.sortOrder === '오름차순'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      );

      this.filteredTransactions = result;
      this.currentPage = 1;
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.filters input,
.filters select {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.filters button {
  background-color: #ffc400;
  color: white;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
}

.filters button:hover {
  background-color: #ffc400;
}

.list {
  list-style: none;
  padding: 0;
}

.list li {
  background: white;
  margin-bottom: 10px;
  padding: 10px 15px;
  border-left: 5px solid #007bff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  border: 1px solid #007bff;
  background-color: white;
  color: #007bff;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
