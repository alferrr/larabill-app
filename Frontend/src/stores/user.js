import { defineStore } from "pinia";
import api from "../api/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
  }),

  actions: {
    async loadUser() {
      try {
        this.loading = true;
        const res = await api.get("/user");
        this.user = res.data;
      } catch (err) {
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await api.post("/logout");
      } catch (err) {
        // even if backend fails, continue logout
        console.warn("Logout request failed");
      }

      // frontend cleanup
      this.user = null;
      localStorage.removeItem("token");

      // optional but clean
      delete api.defaults.headers.common["Authorization"];
    },
  },
});
