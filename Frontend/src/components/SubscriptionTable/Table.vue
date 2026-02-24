<script>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { MdDelete } from "oh-vue-icons/icons";

addIcons(MdDelete);

export default {
  components: {
    "v-icon": OhVueIcon,
  },
};
</script>

<script setup>
import { ref, onMounted } from "vue";
import api, { setToken } from "../../api/api.js";

const subscriptions = ref([]);
const loading = ref(true);

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
    await api.delete(`/subscriptions/${id}`);

    subscriptions.value = subscriptions.value.filter((sub) => sub.id !== id);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token yet — skipping fetch");
    loading.value = false;
    return;
  }

  fetchSubscriptions();
});
</script>

<template>
  <div class="subs-table">
    <p v-if="loading">Loading...</p>

    <table v-else>
      <thead>
        <tr>
          <th>Service</th>
          <th>Cost</th>
          <th>Cycle</th>
          <th>Category</th>
          <th>Due Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="subscriptions.length === 0">
          <td colspan="5">No subscriptions yet</td>
        </tr>

        <tr v-for="sub in subscriptions" :key="sub.id">
          <td>{{ sub.name }}</td>
          <td>₱{{ sub.cost }}</td>
          <td>{{ sub.cycle }}</td>
          <td>{{ sub.category }}</td>
          <td>{{ sub.due_date }}</td>
          <td>
            <button :class="{ paid: sub.paid }" @click="togglePaid(sub.id)">
              {{ sub.paid ? "Paid" : "Unpaid" }}
            </button>
          </td>

          <td>
            <button @click="deleteSub(sub.id)" class="delete">
              <v-icon name="md-delete" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style src="./Table.css"></style>
