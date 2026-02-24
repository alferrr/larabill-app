<script>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { CoClock } from "oh-vue-icons/icons";
import { GiCash } from "oh-vue-icons/icons";
import { BiCalendarCheck } from "oh-vue-icons/icons";

addIcons(CoClock, GiCash, BiCalendarCheck);

export default {
  components: { "v-icon": OhVueIcon },
};
</script>

<script setup>
import { ref } from "vue";
import Subs from "../../components/Add Subs/Subs.vue";
import Table from "../../components/SubscriptionTable/Table.vue";
import TotalMonthly from "../../components/TotalMonthly/TotalMonthly.vue";
import NextDue from "../../components/NextDue/NextDue.vue";
import ActiveCount from "../../components/ActiveCount/ActiveCount.vue";
import Modal from "../../components/Modal/Modal.vue";
import { useSubscriptions } from "../../composable/Subscriptions";
import { getDayName, getFullDate } from "../../utils/date";
import { useUserStore } from "../../stores/user";
import { setToken } from "../../api/api";
import { computed, onMounted } from "vue";
const token = localStorage.getItem("token");
if (token) {
  setToken(token);
}

const {
  subscriptions,
  activeCount,
  totalMonthlyCost,
  nextDue,
  fetchSubscriptions,
} = useSubscriptions();

const day = getDayName();
const date = getFullDate();
const userStore = useUserStore();

const showModal = (false)

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token) {
    fetchSubscriptions();
  }

  userStore.loadUser();
});
</script>

<template>
  <div class="dashboard">
    <div class="upper">
      <div class="getstarted">
        <h1 v-if="userStore.user">Hello, {{ userStore.user.name }}</h1>
        <h1 v-else>Hello 👋</h1>
        <div class="container">
          <div class="box">
            <div class="bhead">
              <v-icon name="co-clock" class="icon" />
              <h2>{{ day }}</h2>
            </div>
            <h3>{{ date }}</h3>
          </div>

          <div class="box">
            <div class="bhead">
              <v-icon name="gi-cash" class="icon" />
              <h2>Total Monthly Cost</h2>
            </div>
            <TotalMonthly :amount="totalMonthlyCost" />
          </div>
          <div class="box">
            <div class="bhead">
              <v-icon name="bi-calendar-check" class="icon" />
              <h2>Next Due</h2>
            </div>
            <NextDue :subscription="nextDue" />
          </div>
        </div>
      </div>

      <div class="promo">
        <Subs />
      </div>
    </div>
    <div class="substable">
      <div class="tabs">
        <div class="categories">
          <button>All Bills</button>
          <button>Streaming</button>
          <button>Utilities</button>
        </div>
        <nav>
          <a href="">See All</a>
        </nav>
      </div>
      <Table />
    </div>
  </div>
</template>
<style src="./dashboard.css"></style>
