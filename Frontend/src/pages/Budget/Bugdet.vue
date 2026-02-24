<script>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiPlus } from "oh-vue-icons/icons";

addIcons(BiPlus);

export default {
  components: {
    "v-icon": OhVueIcon,
  },
};
</script>

<script setup>
import { ref, computed, onMounted } from "vue";
import { setToken } from "../../api/api";
import { useUserStore } from "../../stores/user";

import { useBudget } from "../../composable/Budgets";
import { useSubscriptions } from "../../composable/Subscriptions";

import Gauge from "../../components/Gauge/Gauge.vue";
import SetBudget from "../../components/SetBudget/SetBudget.vue";
import TopCat from "../../components/TopCategories/TopCat.vue";
import Modal from "../../components/Modal/Modal.vue";

const showModal = ref(false);

const userStore = useUserStore();

const { totalMonthlyCost, fetchSubscriptions } = useSubscriptions();
const { budget, remaining, fetchBudget, resetBudgets } =
  useBudget(totalMonthlyCost);

const totalBudget = computed(() => {
  if (!budget.value) return 0;

  const general = budget.value.find((b) => b.category === "General");

  return general ? Number(general.amount) : 0;
});

const remainingTotal = computed(() => {
  if (totalBudget.value <= 0) return 0;
  return Math.max(totalBudget.value - totalSpent.value, 0);
});

const totalSpent = computed(() => {
  return Number(totalMonthlyCost.value || 0);
});

const percentUsed = computed(() => {
  if (totalBudget.value <= 0) return 0;
  return Math.min((totalSpent.value / totalBudget.value) * 100, 100);
});

const isAlmostEmpty = computed(() => {
  return (
    totalBudget.value > 0 && remainingTotal.value <= totalBudget.value * 0.2
  );
});

const isBrokie = computed(() => {
  return (
    totalBudget.value > 0 && remainingTotal.value <= totalBudget.value * 0.05
  );
});

const resetAllBudgets = async () => {
  const confirmed = confirm("This will delete ALL your budgets. Are you sure?");

  if (!confirmed) return;

  await resetBudgets();
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  setToken(token);
  userStore.loadUser();
  fetchSubscriptions();
  fetchBudget();
});
</script>

<template>
  <Modal :show="showModal" @close="showModal = false">
    <SetBudget />
  </Modal>
  <div class="budget">
    <div class="header">
      <h1>Budget</h1>
      <button @click="showModal = true"><v-icon name="bi-plus" /></button>
    </div>

    <main>
      <div class="box">
        <h2>Total Monthly Budget <br />(General)</h2>

        <Gauge
          v-if="totalBudget > 0"
          :spent="totalSpent"
          :budget="totalBudget"
          class="gauge"
        />

        <div v-else class="loading">Set a budget to get started</div>

        <div class="text" v-if="totalBudget > 0">
          <h3>
            <span class="number">₱{{ remainingTotal }}</span> Left
          </h3>
          <h3>₱{{ totalSpent }} used of ₱{{ totalBudget }} limit</h3>
        </div>

        <div class="pill broke" v-if="isBrokie">Uh-oh… You’re out of cash!</div>

        <div class="pill almost" v-else-if="isAlmostEmpty">
          Watch out! Only a little left.
        </div>

        <div class="pill" v-else-if="totalBudget > 0">You’re on track!</div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="container">
        <div class="boxRight">
          <TopCat />
        </div>
      </div>
    </main>
  </div>
</template>

<style src="./Budget.css"></style>
