<script setup>
import { defineProps } from "vue";

defineProps({
  amount: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div class="total">
    <h3>₱{{ amount.toFixed(2) }}</h3>
  </div>
</template>
<style src="./TotalMonthly.css"></style>
