<script setup></script>

<template>
  <div class="LoginPage">
    <h2>COINIT</h2>
    <form action="">
      <input type="text" placeholder="아이디를 입력하세요" />
      <br />
      <input type="password" placeholder="비밀번호를 입력하세요" />
      <br />
      <button class="loginBtn">로그인</button>
      <button class="joinBtn">회원가입</button>
    </form>
  </div>
</template>

<style scoped>
.LoginPage {
  border: 1px solid lightgray;
  width: 35rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.LoginPage h2 {
  text-align: center;
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
