<script setup>
const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);
</script>

<template>
  <teleport to="body">
    <div v-if="props.show" class="overlay" @click.self="emit('close')">
      <div class="modal">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.body {
  animation: pop 3s ease;
  transition: 0.3s ease;
}

@keyframes pop {
  from {
    scale: 0.3;
  }
  to {
    scale: 1;
  }
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  border: 1px solid var(--border);
  background: var(--box);
  padding: 1.5rem;
  border-radius: 20px;
  width: 30%;

  backdrop-filter: blur(10px);
}
</style>
