<script>
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdSpacedashboardRound,
  BiCalendarFill,
  BiCashCoin,
  IoWallet,
  BiBarChartFill,
} from "oh-vue-icons/icons";
import router from "../../router";

addIcons(
  MdSpacedashboardRound,
  BiCalendarFill,
  BiCashCoin,
  IoWallet,
  BiBarChartFill,
);

export default {
  components: {
    "v-icon": OhVueIcon,
  },
};
</script>

<template>
  <div class="sidebar">
    <header>
      <h1>LaraBill</h1>
    </header>
    <nav class="pc">
      <router-link to="/dashboard"
        ><v-icon name="md-spacedashboard-round" />Dashboard</router-link
      >

      <!-- <a href=""><v-icon name="bi-calendar-fill" />Upcoming</a> -->
      <router-link to="/subscriptions"
        ><v-icon name="bi-cash-coin" />Subscriptions</router-link
      >
      <router-link to="/budget"><v-icon name="io-wallet" />Budget</router-link>
      <router-link to="/reports"
        ><v-icon name="bi-bar-chart-fill" />Reports</router-link
      >
    </nav>
    <nav class="mobile">
      <router-link to="/dashboard"
        ><v-icon name="md-spacedashboard-round"
      /></router-link>

      <!-- <a href=""><v-icon name="bi-calendar-fill" />Upcoming</a> -->
      <router-link to="/subscriptions"
        ><v-icon name="bi-cash-coin"
      /></router-link>
      <router-link to="/budget"><v-icon name="io-wallet" /></router-link>
      <router-link to="/reports"
        ><v-icon name="bi-bar-chart-fill"
      /></router-link>
    </nav>
  </div>
</template>

<style src="./Sidebar.css"></style>
