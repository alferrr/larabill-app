<script setup>
import { ref } from "vue";
import api, { setToken } from "../../api/api.js";
import { useRouter } from "vue-router";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const register = async () => {
  try {
    const res = await api.post("/register", {
      name: firstName.value + " " + lastName.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

    router.push("/");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Registration failed");
  }
};
</script>
<template>
  <div class="login">
    <div class="container">
      <main>
        <h1>Create Account</h1>
        <!-- <p>Your Bills, One Dashboard</p> -->

        <form @submit.prevent="register" class="register">
          <div class="name">
            <div class="input">
              <h4>First Name</h4>
              <input type="text" placeholder="First name" v-model="firstName" />
            </div>
            <div class="input">
              <h4>Last Name</h4>
              <input type="text" placeholder="Last name" v-model="lastName" />
            </div>
          </div>
          <h4>Email</h4>
          <input type="email" placeholder="Enter your email" v-model="email" />

          <h4>Password</h4>
          <input
            type="password"
            placeholder="Enter your password"
            v-model="password"
          />

          <h4>Confirm Password</h4>
          <input
            type="password"
            placeholder="Confirm password"
            v-model="passwordConfirm"
          />

          <button type="submit">Sign Up</button>
        </form>
      </main>
      <div class="photo"></div>
    </div>
  </div>
</template>
<style src="./Login.css"></style>
