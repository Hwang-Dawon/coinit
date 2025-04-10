<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?.userId || '';

const user = ref(null);
const password = ref('');
const phone = ref('');
const email = ref('');

onMounted(async () => {
  const res = await axios.get(
    `http://localhost:3001/LoginInfo?userId=${userId}`
  );
  user.value = res.data[0];
  password.value = user.value.password;
  phone.value = user.value.phone;
  email.value = user.value.email;
});

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
    <h2>정보 수정</h2>
    <input type="password" v-model="password" placeholder="비밀번호" />
    <input type="text" v-model="phone" placeholder="전화번호" />
    <input type="text" v-model="email" placeholder="이메일" />
    <button @click="updateUser">저장</button>
    <button @click="$router.push('/mypage')">취소</button>
  </div>
</template>

<style scoped>
.EditInfo {
}
</style>
