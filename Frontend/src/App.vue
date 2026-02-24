<script>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { FaRegularUserCircle } from "oh-vue-icons/icons";

addIcons(FaRegularUserCircle);

export default {
  components: {
    "v-icon": OhVueIcon,
  },
};
</script>

<script setup>
import Navbar from "./components/Sidebar/Sidebar.vue";
import Dashboard from "./pages/Dashboard/dashboard.vue";

import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
onMounted(() => {
  userStore.loadUser();
});

const logout = async () => {
  await userStore.logout();
  router.push({ name: "Login" });
};
</script>

<template>
  <div class="app">
    <header v-if="route.name !== 'Login' && route.name !== 'Register'">
      <h1>LaraBill</h1>
      <div class="right">
        <div class="userDeets" v-if="userStore.user">
          <v-icon name="fa-regular-user-circle" class="user" />
          <div class="text">
            <p>{{ userStore.user.name }}</p>
            <small>{{ userStore.user.email }}</small>
          </div>

          <button @click="logout">Logout</button>
        </div>

        <div class="userDeets" v-else>
          <p>Loading..</p>
        </div>
      </div>
    </header>
    <div class="main">
      <aside v-if="route.name !== 'Login' && route.name !== 'Register'">
        <Navbar />
      </aside>
      <main
        :class="{
          'full-width': route.name === 'Login' || route.name == 'Register',
        }"
      >
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
main.full-width {
  flex: 1;
  width: 100%;
  padding: 0;
}
</style>
