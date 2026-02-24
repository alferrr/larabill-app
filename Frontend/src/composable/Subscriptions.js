import { ref, computed, onMounted } from "vue";
import api, { setToken } from "../api/api.js";

const subscriptions = ref([]);
const loading = ref(true);

export function useSubscriptions() {
  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) setToken(token);

      const res = await api.get("/subscriptions");
      subscriptions.value = res.data;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const togglePaid = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setToken(token);

      const res = await api.patch(`/subscriptions/${id}/toggle`);

      const index = subscriptions.value.findIndex((s) => s.id === id);
      subscriptions.value[index] = res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSub = async (id) => {
    if (!confirm("Delete this subscription?")) return;

    try {
      const token = localStorage.getItem("token");
      if (token) setToken(token);

      await api.delete(`/subscriptions/${id}`);

      subscriptions.value = subscriptions.value.filter((sub) => sub.id !== id);
    } catch (err) {
      console.error(err);
    }
  };

  const activeCount = computed(
    () => subscriptions.value.filter((s) => !s.paid).length,
  );

  const totalMonthlyCost = computed(() =>
    subscriptions.value.reduce((sum, s) => sum + Number(s.cost), 0),
  );

  const nextDue = computed(
    () =>
      subscriptions.value
        .filter((s) => !s.paid)
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0],
  );

  const highestMonthlyBill = computed(() =>
    subscriptions.value.length
      ? Math.max(...subscriptions.value.map((s) => Number(s.cost)))
      : 0,
  );

  return {
    subscriptions,
    loading,
    fetchSubscriptions,
    togglePaid,
    deleteSub,
    activeCount,
    totalMonthlyCost,
    nextDue,
    highestMonthlyBill,
  };
}
