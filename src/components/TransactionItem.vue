<template>
  <div>{{ transaction.description }} - {{ transaction.amount }}원</div>
</template>

<script>
export default {
  props: ['transaction'],
};
</script>
