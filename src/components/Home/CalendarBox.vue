<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const selectedDate = ref(new Date());
</script>

<template>
  <div class="datepicker-wrapper">
    <Datepicker v-model="selectedDate" inline />
  </div>
</template>
