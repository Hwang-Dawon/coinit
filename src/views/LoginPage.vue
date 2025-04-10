<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const userID = ref('');
const password = ref('');

const idPasswordRegex = /^[a-zA-Z0-9]+$/;

const login = async () => {
  if (!userID.value || !password.value) {
    alert('아이디와 비밀번호를 모두 입력하세요.');
    return;
  }

  if (
    !idPasswordRegex.test(userID.value) ||
    !idPasswordRegex.test(password.value)
  ) {
    alert('아이디와 비밀번호는 영어와 숫자만 입력 가능합니다.');
    return;
  }

  try {
    const response = await axios.get('http://localhost:3001/LoginInfo');
    const userList = response.data;

    const user = userList.find(
      (u) => u.userId === userID.value && u.password === password.value
    );

    if (user) {
      alert('로그인 성공!');
      localStorage.setItem('user', JSON.stringify(user));

      // ✅ 로그인 성공 시 /Home 경로로 이동
      router.push('/Home');
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  } catch (error) {
    console.error('로그인 중 오류:', error);
    alert('서버 오류가 발생했습니다.');
  }
};
</script>

<template>
  <div class="LoginPage">
    <form class="login-container">
      <h2>COINIT <i class="fa-solid fa-coins"></i></h2>
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        v-model.trim="userID"
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        v-model.trim="password"
      />
      <br />
      <button class="loginBtn" @click.prevent="login">로그인</button>
      <router-link to="/join" class="joinBtn">회원가입</router-link>
    </form>
  </div>
</template>

<style scoped>
.LoginPage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}
.login-container {
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
.login-container h2 {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 24px;
  color: #5d3a00;
}
.login-container h2 i {
  text-align: center;
  color: #ffd338;
}
.LoginPage input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  transition: border-color 0.2s ease;
}

.LoginPage input:focus {
  border-color: #5c7cfa;
  outline: none;
}

.loginBtn,
.joinBtn {
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

.loginBtn:hover,
.joinBtn:hover {
  background-color: #e6bc2e;
}

.joinBtn {
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
</style>
