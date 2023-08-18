<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "./stores/store";

import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";
import { Action, url } from "./api";

const store = useStore();

if ("theme" in localStorage) {
  if (localStorage.getItem("theme") == "light") {
    document.documentElement.classList.remove("dark");
    store.isLightTheme = true;
  } else if (localStorage.getItem("theme") == "dark") {
    document.documentElement.classList.add("dark");
    store.isLightTheme = false;
  }
} else {
  localStorage.setItem("theme", "light");
}

const users = ref([]);
const loggedInUser = ref({});

onMounted(() => {
  Action.get(url + "users", (response) => {
    users.value = response.data;
  }).then(() => {
    if ("loggedInUser" in localStorage) {
      let chosen = users.value.filter((user) => {
        if (user.uid == parseInt(localStorage.getItem("loggedInUser"))) {
          return user;
        }
      });

      if (chosen[0]) {
        store.isLoggedIn = true;
        loggedInUser.value = chosen[0];
        localStorage.setItem("loggedInUser", chosen[0].uid);
      } else {
        store.isLoggedIn = false;
        loggedInUser.value = {};
        localStorage.setItem("loggedInUser", "");
      }
    } else {
      localStorage.setItem("loggedInUser", "");
      store.isLoggedIn = false;
      loggedInUser.value = {};
    }
  }).then(() => console.log(loggedInUser.value))
});

const toggleTheme = () => {
  if (store.isLightTheme == true) {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    store.isLightTheme = false;
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    store.isLightTheme = true;
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
</script>

<template>
  <header>
    <HeaderView
      @toggleSmallNavbar="toggleSmallNavbar"
      @toggleSidebar="toggleSidebar"
      @toggleTheme="toggleTheme"
      :store="store"
      :loggedInUser="loggedInUser"
    />
  </header>

  <main>
    <RouterView class="mt-[250px]" :loggedInUser="loggedInUser" />
  </main>

  <footer>
    <FooterView />
  </footer>
</template>
