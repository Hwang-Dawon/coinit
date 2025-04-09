<script setup></script>

<template>
  <div class="LoginPage">
    <h2>COINIT <i class="fa-solid fa-coins"></i></h2>

    <form class="join-container">
      <input type="text" placeholder="아이디를 입력하세요" id="id" />
      <br />
      <input type="password" placeholder="비밀번호를 입력하세요" pw="pw" />
      <br />
      <input type="text" placeholder="이름을 입력하세요" id="name" />
      <br />
      <input type="text" placeholder="휴대폰 번호를 입력하세요" id="phone" />
      <br />
      <input type="text" placeholder="이메일 입력하세요" id="email" />
      <button class="joinBtn">회원가입</button>
      <button class="backBtn">홈</button>
    </form>
  </div>
</template>

<style scoped>
.LoginPage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.join-container {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 24px;
  color: #333;
}

input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: #5c7cfa;
  outline: none;
}

button {
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.joinBtn {
  background-color: #ffd338;
  color: #5d3a00;
  margin-top: 12px;
}

.joinBtn:hover {
  background-color: #e6bc2e;
}

.backBtn {
  background-color: #ffd338;
  color: #5d3a00;
}

.backBtn:hover {
  background-color: #e6bc2e;
}
</style>
