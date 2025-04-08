<script setup></script>

<template>
  <div class="LoginPage">
    <h2>COINIT <i class="fa-solid fa-coins"></i></h2>

    <form class="login-contants">
      <input type="text" placeholder="아이디를 입력하세요" id="id" />
      <br />
      <input type="password" placeholder="비밀번호를 입력하세요" pw="pw" />
      <br />
      <input type="text" placeholder="이메일 입력하세요" id="email" />
      <input type="text" placeholder="휴대폰 번호를 입력하세요" id="phone" />
      <button class="oinBtn">회원가입</button>
      <button class="backBtn">홈</button>
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
