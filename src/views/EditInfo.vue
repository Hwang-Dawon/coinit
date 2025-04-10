<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// localStorage에서 로그인된 사용자 정보 꺼내오기
const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?.userId || '';

const user = ref(null);
const password = ref('');
const phone = ref('');
const email = ref('');

// 컴포넌트가 처음 화면에 보여졌을 때 실행
onMounted(async () => {
  const res = await axios.get(
    `http://localhost:3001/LoginInfo?userId=${userId}`
  );
  // 가져온 사용자 정보 중 첫 번째 유저를 저장
  user.value = res.data[0];

  password.value = user.value.password;
  phone.value = user.value.phone;
  email.value = user.value.email;
});

// 수정 버튼 클릭 시 실행되는 함수
const updateUser = async () => {
  await axios.put(`http://localhost:3001/LoginInfo/${user.value.id}`, {
    ...user.value,
    password: password.value,
    phone: phone.value,
    email: email.value,
  });
  alert('수정 완료!');
  router.push('/mypage');
};
</script>

<template>
  <div class="EditInfo">
    <form class="edit-container">
      <h2>정보 수정</h2>
      <input type="password" v-model="password" placeholder="비밀번호" />
      <input type="text" v-model="phone" placeholder="전화번호" />
      <input type="text" v-model="email" placeholder="이메일" />
      <button @click="updateUser">저장</button>
      <button @click="$router.push('/mypage')">취소</button>
    </form>
  </div>
</template>

<style scoped>
.EditPage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.edit-container {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-container h2 {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 24px;
  color: #5d3a00;
}

.edit-container input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  transition: border-color 0.2s ease;
}

.edit-container input:focus {
  border-color: #5c7cfa;
  outline: none;
}

.saveBtn,
.cancelBtn {
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

.saveBtn:hover,
.cancelBtn:hover {
  background-color: #e6bc2e;
}
</style>
