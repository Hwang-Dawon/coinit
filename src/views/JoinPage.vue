<script setup>
import { ref, watch } from 'vue';

//입력값
const userId = ref('');
const password = ref('');
const name = ref('');
const phone = ref('');
const email = ref('');

//에러 메세지 상태
const userIdError = ref('');
const passwordError = ref('');
const nameError = ref('');
const phoneError = ref('');
const emailError = ref('');

//정규식
const userIdRegex = /^[a-zA-Z0-9]{6,}$/;
const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
const nameRegex = /^[가-힣]{6}$/;
const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//실시간 유효성 검사
const validataId = () => {
  if (!userIdRegex.test(userId.value)) {
    userIdError.value = '아이디는 6자 이상 입니다.';
  } else {
    userIdError.value = '';
  }
};
const validataPassword = () => {
  if (!passwordRegex.test(password.value)) {
    passwordError.value = '비밀번호는 6자 이상 입니다.';
  } else {
    passwordError.value = '';
  }
};
const validataName = () => {
  if (!nameRegex.test(name.value)) {
    nameError.value = '이름은 한글만 입력 가능합니다.';
  } else {
    nameError.value = '';
  }
};
const validataPhone = () => {
  if (!phoneRegex.test(name.value)) {
    phoneError.value = '000-0000-0000 형식으로 입력해야 합니다.';
  } else {
    phoneError.value = '';
  }
};
const validataEmail = () => {
  if (!emailRegex.test(name.value)) {
    emailError.value = '올바른 이메일 형식이 아닙니다.';
  } else {
    emailError.value = '';
  }
};

//JSON 형태로 변환
const newUser = {
  id: Date.now(),
  userId: userId.value,
  password: password.value,
  name: name.value,
  phone: phone.value,
  email: email.value,
};

console.log('저장될 데이터 형식:', newUser);
alert('회원가입이 완료되었습니다!');

//초기화
userId.value = '';
password.value = '';
name.value = '';
phone.value = '';
email.value = '';
</script>

<template>
  <div class="JoinPage">
    <form class="join-container">
      <h2>COINIT <i class="fa-solid fa-coins"></i></h2>

      <div class="form-group">
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          v-model="userId"
          @input="validataId"
        />
        <span class="error" v-if="userIdError">{{ userIdError }}</span>
      </div>

      <div class="form-group">
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          v-model="password"
          @input="validataPassword"
        />
        <span class="error" v-if="passwordError">{{ passwordError }}</span>
      </div>

      <div class="form-group">
        <input
          type="text"
          placeholder="이름을 입력하세요"
          v-model="name"
          @input="validataName"
        />
        <span class="error" v-if="nameError">{{ nameError }}</span>
      </div>

      <div class="form-group">
        <input
          type="text"
          placeholder="휴대폰 번호를 입력하세요"
          v-model="phone"
          @input="validataPhone"
        />
        <span class="error" v-if="userIdError">{{ phoneError }}</span>
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="이메일 입력하세요"
          v-model="email"
          @input="validataEmail"
        />
        <span class="error" v-if="emailError">{{ emailError }}</span>
      </div>

      <button class="joinBtn" @click="handleJoin">회원가입</button>
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
.form-group {
  display: flex;
  flex-direction: column;
  position: relative;
}
.form-group input {
  margin-bottom: 0px;
}

.error {
  height: 18px; /* 항상 일정 높이 확보 */
  font-size: 13px;
  color: red;
  margin-top: 2px;
  padding-left: 4px;
  line-height: 18px;
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
.error {
  color: red;
  font-size: 13px;
  margin: 4px 0;
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
