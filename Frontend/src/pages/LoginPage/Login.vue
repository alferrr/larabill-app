<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api, { setToken } from "../../api/api.js"; // your Axios instance

const router = useRouter();

// Form fields
const email = ref("");
const password = ref("");

// Login function
const login = async () => {
  try {
    const res = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    // Save token
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

    // Redirect to dashboard
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  }
};
</script>
<template>
  <div class="login">
    <div class="container">
      <main>
        <h1>LaraBill</h1>
        <p>Your Bills, One Dashboard</p>

        <form @submit.prevent="login">
          <h4>Email</h4>
          <input type="email" placeholder="Enter your email" v-model="email" />
          <h4>Password</h4>
          <input
            type="password"
            placeholder="Enter your password"
            v-model="password"
          />

          <button type="submit">Log in</button>
        </form>
        <div class="reg">
          <span>Dont have an account?</span>
          <a href="/register">Create one now.</a>
        </div>
      </main>
      <div class="photo"></div>
    </div>
  </div>
</template>
<style src="./Login.css"></style>
