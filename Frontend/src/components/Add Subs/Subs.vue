<script setup>
import { ref } from "vue";
import api, { setToken } from "../../api/api.js";

const provider = ref("");
const cost = ref("");
const category = ref("Streaming");
const cycle = ref("Monthly");
const dueDate = ref("");

const addSubscription = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) setToken(token);

    await api.post("/subscriptions", {
      name: provider.value,
      cost: cost.value,
      category: category.value,
      cycle: cycle.value,
      due_date: dueDate.value,
    });

    alert("Subscription added!");

    provider.value = "";
    cost.value = "";
    cycle.value = "Monthly";
    category.value = "Streaming";
    dueDate.value = "";
  } catch (err) {
    console.error("Full error:", err);
    console.error("Response data:", err.response?.data);
    console.error("Status:", err.response?.status);
    alert("Failed to add subscription");
  }
};
</script>

<template>
  <div class="subs">
    <div class="head">
      <h2>Add Subscription</h2>
      <button type="submit" form="subForm">Add</button>
    </div>

    <form id="subForm" @submit.prevent="addSubscription">
      <h4>Provider</h4>
      <input
        type="text"
        v-model="provider"
        required
        placeholder="Eg. Netflix, Spotify, Electricity"
      />

      <div class="input">
        <div class="group">
          <h4>Cost</h4>
          <input
            type="number"
            step="0.01"
            v-model="cost"
            required
            placeholder="How much?"
          />
        </div>
        <div class="group">
          <h4>Category</h4>
          <select v-model="category">
            <option>Streaming</option>
            <option>Utilities</option>
            <option>Health and Fitness</option>
            <option>Others</option>
          </select>
        </div>
      </div>

      <div class="input">
        <select v-model="cycle">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>

        <input type="date" v-model="dueDate" required class="date" />
      </div>
    </form>
  </div>
</template>

<style src="./Subs.css"></style>
