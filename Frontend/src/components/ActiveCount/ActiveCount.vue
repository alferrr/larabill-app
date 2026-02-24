<script setup>
import { defineProps } from "vue";

defineProps({
  amount: Number,
});
</script>
<template>
  <div class="active">
    <h3>{{ amount }}</h3>
    <p>Active Subscriptions</p>
  </div>
</template>
<style scoped>
h3 {
  font-size: 7rem;
}

p {
  color: green;
  font-weight: 400;
  font-family: var(--heading);
}

.active {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
