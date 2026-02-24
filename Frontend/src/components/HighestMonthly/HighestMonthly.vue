<script setup>
import { defineProps } from "vue";

defineProps({
  amount: Number,
});
</script>
<template>
  <div class="highest">
    <h3>₱{{ amount.toFixed(2) }}</h3>
  </div>
</template>
