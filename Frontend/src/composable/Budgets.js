import api from "../api/api";
import { ref, computed } from "vue";

export function useBudget(totalMonthlyCost) {
  const budget = ref(null);

  const remaining = computed(() => {
    if (!budget.value) return 0;
    return budget.value.amount - totalMonthlyCost.value;
  });

  const fetchBudget = async () => {
    try {
      const res = await api.get("/budget");
      budget.value = res.data;
    } catch (err) {
      console.error("Failed to fetch budget:", err);
      budget.value = null;
    }
  };

  const updateBudget = async (amount) => {
    try {
      const res = await api.patch("/budget", { amount });
      budget.value = res.data;
    } catch (err) {
      console.error("Failed to update budget:", err);
    }
  };

  const resetBudgets = async () => {
    try {
      await api.delete("/budget");
      budget.value = [];
    } catch (err) {
      console.error("Failed to reset budgets:", err);
    }
  };

  return { budget, remaining, fetchBudget, updateBudget, resetBudgets };
}
