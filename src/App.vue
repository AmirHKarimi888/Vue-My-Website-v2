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
  const sidebar = document.querySelector("#drawer-disable-body-scrolling");
  if(sidebar.classList.contains("translate-x-full")) {
    sidebar.classList.remove("translate-x-full");
    sidebar.classList.add("translate-x-0");
    document.querySelector(".sidebar-backdrop").classList.add("fixed", "w-full", "h-screen", "backdrop-blur-sm");
  } else if(sidebar.classList.contains("translate-x-0")) {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");
    document.querySelector(".sidebar-backdrop").classList.remove("fixed", "w-full", "h-screen","backdrop-blur-sm");
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
