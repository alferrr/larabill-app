<script setup>
import { onMounted, ref, computed } from "vue";
import api, { setToken } from "../../api/api.js";

const topCategories = ref([]);
const budgets = ref([]);

const fetchTopCategories = async () => {
  const token = localStorage.getItem("token");
  if (token) setToken(token);

  try {
    const res = await api.get("/subscriptions/top-categories");

    console.log("Top Categories API:", res.data); //debugging
    topCategories.value = res.data.map((cat) => ({
      category: cat.category,
      spent: Number(cat.total),
    }));
  } catch (err) {
    console.error("Failed to fetch top categories:", err);
    topCategories.value = [];
  }
};

// Fetch budgets
const fetchBudgets = async () => {
  const token = localStorage.getItem("token");
  if (token) setToken(token);

  try {
    const res = await api.get("/budget");
    if (Array.isArray(res.data)) {
      budgets.value = res.data.map((b) => ({
        ...b,
        amount: Number(b.amount),
      }));
    } else {
      budgets.value = [];
    }
  } catch (err) {
    console.error("Failed to fetch budgets:", err);
    budgets.value = [];
  }
};

const categoryPercentages = computed(() => {
  return topCategories.value.map((cat) => {
    const budget = budgets.value.find((b) => b.category === cat.category);
    const amount = budget ? Number(budget.amount) : 0;
    const percent = amount > 0 ? (cat.spent / amount) * 100 : 0;

    return {
      category: cat.category,
      spent: cat.spent,
      budget: amount,
      percent: Math.min(percent, 100).toFixed(2),
    };
  });
});

// Load data on mount
onMounted(async () => {
  await fetchBudgets();
  await fetchTopCategories();
});
</script>

<template>
  <div class="top-categories">
    <h2>Top Categories</h2>

    <div
      v-for="cat in categoryPercentages"
      :key="cat.category"
      class="category-box"
    >
      <h4>{{ cat.category }}</h4>
      <p>₱{{ cat.spent }} spent of ₱{{ cat.budget }}</p>
      <div class="bar">
        <div
          class="fill"
          :style="{ width: cat.percent + '%', background: '#6f5de7' }"
        ></div>
      </div>
      <p>{{ cat.percent }}%</p>
    </div>
  </div>
</template>

<style>
.top-categories {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.category-box {
  background: #a7a7a70b;
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bar {
  width: 100%;
  height: 12px;
  background: #292929;
  border-radius: 6px;
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 6px 0 0 6px;
}
</style>
