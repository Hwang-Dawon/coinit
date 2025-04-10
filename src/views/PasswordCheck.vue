<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const passwordInput = ref('');
const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?.userId || '';

const checkPassword = async () => {
  const res = await axios.get(
    `http://localhost:3001/LoginInfo?userId=${userId}`
  );
  const user = res.data[0];

  if (passwordInput.value === user.password) {
    router.push('/mypage/edit');
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
};
</script>

<template>
  <div class="PasswordCheck">
    <h2>비밀번호 확인</h2>
    <input
      type="password"
      placeholder="비밀번호를 입력하세요"
      v-model="passwordInput"
    />
    <button @click="checkPassword">확인</button>
    <button @click="$router.push('/mypage')">돌아가기</button>
  </div>
</template>

<style scoped>
.PasswordCheck {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.check-container {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.check-container h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #5d3a00;
}

.check-container input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  transition: border-color 0.2s ease;
}

.check-container input:focus {
  border-color: #5c7cfa;
  outline: none;
}

.checkBtn,
.backBtn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #ffd338;
  color: #5d3a00;
  margin-bottom: 12px;
}

.checkBtn:hover,
.backBtn:hover {
  background-color: #e6bc2e;
}
</style>
