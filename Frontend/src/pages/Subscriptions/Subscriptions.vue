<script setup>
import { ref, onMounted } from "vue";

// components
import Modal from "../../components/Modal/Modal.vue";
import Subs from "../../components/Add Subs/Subs.vue";
import Table from "../../components/SubscriptionTable/Table.vue";
import NextDue from "../../components/NextDue/NextDue.vue";
import ActiveCount from "../../components/ActiveCount/ActiveCount.vue";
import HighestMonthly from "../../components/HighestMonthly/HighestMonthly.vue";

// composables
import { useSubscriptions } from "../../composable/Subscriptions";
import { useUserStore } from "../../stores/user";

const showModal = ref(false);

const {
  subscriptions,
  activeCount,
  totalMonthlyCost,
  highestMonthlyBill,
  nextDue,
  fetchSubscriptions,
} = useSubscriptions();

const userStore = useUserStore();

onMounted(() => {
  fetchSubscriptions();

  const token = localStorage.getItem("token");

  if (token) {
    fetchSubscriptions();
  }

  userStore.loadUser();
});
</script>

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

<template>
  <Modal :show="showModal" @close="showModal = false">
    <Subs />
  </Modal>

  <div class="subscriptions">
    <div class="subsTitle">
      <h1>Your Subscriptions</h1>
      <nav>
        <button @click="showModal = true"><v-icon name="bi-plus" /></button>
      </nav>
    </div>
    <div class="subsHead">
      <div class="container">
        <h2>Highest Monthly Bill</h2>
        <HighestMonthly :amount="highestMonthlyBill" />
      </div>
      <div class="container">
        <h2>Next Due</h2>
        <NextDue :subscription="nextDue" />
      </div>
      <div class="container"><ActiveCount :amount="activeCount" /></div>
    </div>
    <div class="subsTable">
      <Table />
    </div>
  </div>
</template>
<style src="./Subscription.css"></style>
