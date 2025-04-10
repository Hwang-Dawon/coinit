<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// localStorage에서 로그인된 사용자 정보 가져오기
const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?.userId || '';

const user = ref(null);
const password = ref('');
const phone = ref('');
const email = ref('');

// 페이지 로드 시 사용자 정보 가져오기
onMounted(async () => {
  try {
    const res = await axios.get(
      `http://localhost:3001/LoginInfo?userId=${userId}`
    );
    if (res.data.length === 0) {
      alert('사용자 정보를 찾을 수 없습니다.');
      router.push('/');
      return;
    }

    user.value = res.data[0]; // id 포함된 전체 유저 정보

    // 폼에 데이터 채우기
    password.value = user.value.password;
    phone.value = user.value.phone;
    email.value = user.value.email;
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    alert('서버 오류가 발생했습니다.');
  }
});

// 정보 수정 함수
const updateUser = async () => {
  try {
    // user.value가 비어있거나 id가 없는 경우 처리
    if (!user.value || !user.value.id) {
      alert('사용자 정보가 정확하지 않습니다. 다시 로그인해주세요.');
      return;
    }

    const id = Number(user.value.id);

    const updatedData = {
      id,
      userId: user.value.userId,
      name: user.value.name,
      password: password.value,
      phone: phone.value,
      email: email.value,
    };

    console.log('수정 요청 데이터:', updatedData); //  디버깅 로그

    await axios.put(`http://localhost:3001/LoginInfo/${id}`, updatedData);

    alert('수정 완료!');
    router.push('/mypage');
  } catch (err) {
    console.error('수정 오류:', err);
    alert('정보 수정 중 오류가 발생했습니다.');
  }
};
</script>

<template>
  <div class="EditInfo">
    <form class="edit-container" @submit.prevent="updateUser">
      <h2>정보 수정</h2>
      <input type="password" v-model="password" placeholder="비밀번호" />
      <input type="text" v-model="phone" placeholder="전화번호" />
      <input type="text" v-model="email" placeholder="이메일" />
      <button class="saveBtn" type="submit">저장</button>
      <button class="cancelBtn" @click="$router.push('/mypage')">취소</button>
    </form>
  </div>
</template>

<style scoped>
.EditInfo {
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
