<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);

const showPasswordCheck = ref(false);
const passwordInput = ref('');

// 페이지 진입 시 최신 정보 불러오기
onMounted(() => {
  const updatedUser = JSON.parse(localStorage.getItem('user'));
  user.value = updatedUser || null;
});

// 비밀번호 확인으로 이동
const gotoPasswordCheck = () => {
  router.push('/mypage/verify');
};
</script>

<template>
  <div class="Mypage" v-if="user">
    <div class="card-container">
      <p>이름: {{ user.name }}</p>
      <p>아이디: {{ user.userId }}</p>
      <p>전화번호: {{ user.phone }}</p>
      <p>이메일: {{ user.email }}</p>
      <button @click="gotoPasswordCheck">수정하기</button>
      <button @click="$router.push('/Home')">돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.Mypage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f8f9fa;
}

.Mypage p {
  margin: 8px 0;
  font-size: 16px;
  color: #333;
  width: 100%;
  max-width: 400px;
}

.Mypage input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-top: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.Mypage button {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #ffd338;
  border: none;
  border-radius: 10px;
  color: #5d3a00;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.Mypage button:hover {
  background-color: #e6bc2e;
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

.password-check {
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  background-color: #fff5d1;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #ffcc00;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.password-check p {
  margin-bottom: 10px;
  font-weight: bold;
  color: #5d3a00;
}

.password-check input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #aaa;
  margin-bottom: 10px;
}

.password-check button {
  width: 100%;
  padding: 10px;
  background-color: #ffd338;
  color: #5d3a00;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.password-check button:hover {
  background-color: #e6bc2e;
}
</style>
