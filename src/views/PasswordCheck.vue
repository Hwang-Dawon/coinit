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
    <h2>비밀번호 확인</h2>
    <input
      type="password"
      placeholder="비밀번호를 입력하세요"
      v-model="passwordInput"
    />
    <button @click="checkPassword">확인</button>
    <button @click="$router.push('/mypage')">돌아가기</button>
  </div>
</template>

<style scoped>
.PasswordCheck {
}
</style>
