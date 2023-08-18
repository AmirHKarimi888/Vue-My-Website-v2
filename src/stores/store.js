import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore("store", async () => {

  const isLightTheme = ref(true);

  const isLoggedIn = ref(false);
  const loggedInUser = ref({});

  return { isLightTheme, isLoggedIn, loggedInUser }
})