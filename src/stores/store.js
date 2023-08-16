import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore("store", () => {

  const isLightTheme = ref(true);

  const isLoggedIn = ref(false);

  return { isLightTheme, isLoggedIn }
})