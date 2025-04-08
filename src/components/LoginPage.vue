<script setup>
import { ref } from 'vue';
import axios from 'axios';
// import JoinPage from '@/router/JoinPage.vue';

const userID = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await axios.get('http://localhost:3001/LoginInfo');
    const userList = response.data;
    const user = userList.find(
      (use) => use.userID === userID.value && use.password === password.value
    );

    if (user) {
      alert('로그인 성공');
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  } catch (error) {
    console.log('로그인중 에러', error);
    alert('서버 에러');
  }
};
</script>

<template>
  <div class="LoginPage">
    <h2>COINIT <i class="fa-solid fa-coins"></i></h2>

    <form class="login-contants">
      <input type="text" placeholder="아이디를 입력하세요" v-model="userID" />
      <br />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        v-model="password"
      />
      <br />
      <button class="loginBtn" @click="login">로그인</button>
      <button class="joinBtn">회원가입</button>
      <!-- <router-link to="/login/join"></router-link> -->
    </form>
  </div>
</template>

<style scoped>
.LoginPage {
  border: 1px solid lightgray;
  width: 35rem;
  margin-top: 3rem;
  position: relative;
  left: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.LoginPage h2 {
  text-align: center;
}
.LoginPage h2 i {
  text-align: center;
  color: #ffd338;
}
.LoginPage input {
  padding: 2px;
  margin: 1rem;
}
button {
  border: none;
  outline: none;
  margin: 1rem;
  padding: 5px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #ffd338;
}
.loginBtn {
}
.joinBtn {
}
</style>
