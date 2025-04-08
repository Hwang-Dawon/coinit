// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // json-server 주소
});

// 전체 거래내역 가져오기
export const fetchTransactions = () => api.get('/transactions');

// 거래 추가
export const addTransaction = (data) => api.post('/transactions', data);

// 거래 삭제
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export default api;
