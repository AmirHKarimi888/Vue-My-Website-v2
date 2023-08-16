<script setup>
import { RouterView } from "vue-router";
import HeaderView from "./components/HeaderView.vue";
import { useStore } from "./stores/store";

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
  if(sidebarBackdrop.classList.contains("w-full")) {
    sidebarBackdrop.classList.remove("w-full");
  } else {
    sidebarBackdrop.classList.add("w-full");
  }
}
</script>

<template>
  <header>
    <HeaderView
      @toggleSmallNavbar="toggleSmallNavbar"
      @toggleSidebar="toggleSidebar"
      @toggleTheme="toggleTheme"
      :store="store"
    />
  </header>

  <main>
    <RouterView :store="store" />
  </main>

  <footer></footer>
</template>
