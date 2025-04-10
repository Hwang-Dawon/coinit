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
    <div class="card-container">
      <h2>비밀번호 확인</h2>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        v-model="passwordInput"
      />
      <button class="checkBtn" @click="checkPassword">확인</button>
      <button class="backBtn" @click="$router.push('/mypage')">돌아가기</button>
    </div>
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
.card-container {
  background-color: #ffffff;
  padding: 30px 20px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.check-container {
  background-color: #ffffff;
  padding: 30px 20px;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 10px; /* 요소 간 간격 */
}

.check-container h2 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
  color: #5d3a00;
}

.check-container input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.checkBtn,
.backBtn {
  padding: 8px;
  font-size: 14px;
  background-color: #ffd338;
  border: none;
  border-radius: 8px;
  color: #5d3a00;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkBtn:hover,
.backBtn:hover {
  background-color: #e6bc2e;
}
</style>
