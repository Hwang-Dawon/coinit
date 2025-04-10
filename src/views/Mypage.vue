<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);

const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?.userId || '';

onMounted(async () => {
  const res = await axios.get(
    `http://localhost:3001/LoginInfo?userId=${userId}`
  );
  user.value = res.data[0];
});
const gotoPasswordCheck = () => {
  router.push('/mypage/verify');
};
</script>

<template>
  <div class="Mypage" v-if="user">
    <p>이름: {{ user.name }}</p>
    <p>아이디: {{ user.userId }}</p>
    <p>전화번호: {{ user.phone }}</p>
    <p>이메일: {{ user.email }}</p>

    <button @click="gotoPasswordCheck">수정하기</button>
    <button>돌아가기</button>

    <!-- 🔐 비밀번호 확인창 -->
    <div v-if="showPasswordCheck" class="password-check">
      <p>현재 비밀번호를 입력하세요</p>
      <input
        type="password"
        v-model="passwordInput"
        placeholder="비밀번호 확인"
      />
      <button @click="confirmPasswordAndUpdate">확인</button>
    </div>
  </div>
</template>

<style scoped>
.Mypage {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  max-width: 400px;
  margin: auto;
}
.Mypage input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.Mypage button {
  padding: 10px;
  background-color: #ffd338;
  border: none;
  border-radius: 10px;
  color: #5d3a00;
  font-weight: bold;
  cursor: pointer;
}
.Mypage button:hover {
  background-color: #e6bc2e;
}
.password-check {
  margin-top: 15px;
  background-color: #fff5d1;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ffcc00;
}
.password-check input {
  width: 100%;
  margin-top: 8px;
  padding: 6px;
  border-radius: 8px;
  border: 1px solid #aaa;
}
</style>
