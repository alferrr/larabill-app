<script setup>
defineProps({
  subscription: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <div class="nextdue" v-if="subscription">
    <p>{{ subscription.name }}</p>
    <h3>₱{{ subscription.cost }}</h3>
    <h4 class="due">{{ subscription.due_date }}</h4>
  </div>
  <div class="nextdue" v-else>
    <p>No upcoming bills</p>
    <h2>All paid!</h2>
  </div>
</template>

<style scoped>
.nextdue {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: start;
}
.due {
  background: rgba(255, 0, 0, 0.138);
  border-radius: 100px;
  padding: 3px 12px;
  color: rgb(255, 124, 124);
  text-align: center;
  font-size: 12px;
}
</style>
