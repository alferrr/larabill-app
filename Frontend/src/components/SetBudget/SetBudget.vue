<script setup>
import { ref } from "vue";
import api, { setToken } from "../../api/api.js";
import { useBudget } from "../../composable/Budgets.js";

const amount = ref("");
const category = ref("General");

const { resetBudgets } = useBudget();

const saveBudget = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) setToken(token);

    const res = await api.post("/budget", {
      amount: amount.value,
      category: category.value,
    });

    alert("Budget saved!");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to save budget");
  }
};

const resetAllBudgets = async () => {
  const confirmed = confirm("This will delete ALL your budgets. Are you sure?");

  if (!confirmed) return;

  await resetBudgets();
};
</script>

<template>
  <form @submit.prevent="saveBudget">
    <select v-model="category">
      <option>General</option>
      <option>Streaming</option>
      <option>Utilities</option>
      <option>Health</option>
      <option>Others</option>
    </select>

    <input
      type="number"
      v-model="amount"
      placeholder="Budget Amount"
      required
    />

    <button type="submit">Save Budget</button>
  </form>
  <button v-on:click="resetAllBudgets()" class="reset">Reset Budgets</button>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  font-family: "DM Sans", sans-serif;

  select {
    border: 1px solid var(--border);
    border-radius: 5px;
    background: none;
    color: white;
    padding: 8px;
    color: gray;
    transition: 0.3s ease;

    &:focus {
      border: 1px solid var(--purple);
    }
  }
  input {
    border-radius: 5px;
    padding: 8px;
    background: none;
    outline: none;
    border: 1px solid var(--border);
    transition: 0.3s ease;
    color: white;

    &:focus {
      border-color: var(--purple);
    }
  }

  button {
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: none;
    background: var(--purple);
    font-weight: 600;
    font-family: "DM Sans";
    cursor: pointer;
    transition: 0.3s ease;
    border: 1px solid var(--box);
    /* margin-top: 1em; */

    &:hover {
      background: none;
      border-color: var(--purple);
      color: var(--purple);
    }
  }
}

.reset {
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: var(--purple);
  font-weight: 600;
  font-family: "DM Sans";
  cursor: pointer;
  transition: 0.3s ease;
  border: 1px solid var(--box);
  background: none;
  color: var(--purple);
  color: rgb(186, 0, 0);

  &:hover {
    color: red;
    border-color: var(--box);
  }
}
</style>
