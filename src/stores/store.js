import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore("store", () => {

  const isLightTheme = ref(true);

  const isLoggedIn = ref(false);
  const loggedInUser = ref({});

  if ("theme" in localStorage) {
    if (localStorage.getItem("theme") == "light") {
      document.documentElement.classList.remove("dark");
      isLightTheme.value = true;
    } else if (localStorage.getItem("theme") == "dark") {
      document.documentElement.classList.add("dark");
      isLightTheme.value = false;
    }
  } else {
    localStorage.setItem("theme", "light");
    isLightTheme.value = true;
  }

  const toggleTheme = () => {
    if (isLightTheme.value == true) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      isLightTheme.value = false;
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      isLightTheme.value = true;
    }
  };

  const toggleSmallNavbar = () => {
    const smallNavbar = document.querySelector("#small-navbar");
    if (smallNavbar.classList.contains("hidden")) {
      smallNavbar.classList.remove("hidden");
    } else {
      smallNavbar.classList.add("hidden");
    }
  };

  const toggleSidebar = () => {
    const sidebarBackdrop = document.querySelector("#sidebar-backdrop");
    if (sidebarBackdrop.classList.contains("w-full")) {
      sidebarBackdrop.classList.remove("w-full");
    } else {
      sidebarBackdrop.classList.add("w-full");
    }
  };

  const openModal = (id) => {
    document.getElementById(id).classList.remove("hidden");
  }
  const closeModal = (id) => {
    document.getElementById(id).classList.add("hidden");
  }

  const signOut = (id) => {
    isLoggedIn.value = false;
    loggedInUser.value = {};
    localStorage.setItem("loggedInUser", "");
    document.getElementById(id).classList.remove("hidden");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000)
  }

  return { isLightTheme, isLoggedIn, loggedInUser, toggleTheme, toggleSmallNavbar, toggleSidebar, openModal, closeModal, signOut }
})