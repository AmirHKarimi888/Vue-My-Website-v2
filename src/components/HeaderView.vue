<script setup>
import { ref, watchEffect } from "vue"

import SidebarView from './SidebarView.vue';

const emit = defineEmits(["toggleTheme", "toggleSmallNavbar", "toggleSidebar"]);
defineProps(["store", "loggedInUser"]);


</script>

<template>
  <div class="header">
    <nav
      class="fixed top-0 w-full z-20 bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 border-b border-b-gray-400"
    >
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a href="/" class="flex items-center">
          <img src="favicon.ico" class="h-8 mr-3" alt="Flowbite Logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >My Website</span
          >
        </a>

        <div class="flex items-center md:order-2">
          <!-- Dropdown menu -->
          <div
            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white"
                >Bonnie Green</span
              >
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-400"
                >name@flowbite.com</span
              >
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Dashboard</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Settings</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Earnings</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Sign out</a
                >
              </li>
            </ul>
          </div>

          <button
            @click="emit('toggleTheme')"
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex items-center p-2 me-2 w-10 h-10 justify-center text-2xl text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <i v-if="store.isLightTheme" class="fa fa-moon-o"></i>
            <i v-else class="fa fa-sun-o"></i>
          </button>

          <button
            @click="emit('toggleSmallNavbar')"
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex items-center p-2 me-2 w-10 h-10 justify-center text-2xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <i class="fa fa-bars"></i>
          </button>

          <button
            v-if="store.isLoggedIn"
            @click="emit('toggleSidebar')"
            type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              :src="loggedInUser.avatar"
              alt="user photo"
            />
          </button>
        </div>

        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="small-navbar"
        >
          <ul
            class="flex flex-col text-black dark:text-white font-medium p-4 md:p-0 mt-4 border border-gray-300 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <router-link
                to="/"
                class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li v-if="store.isLoggedIn">
              <router-link
                to="/dashboard"
                class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0"
                >Dashboard</router-link
              >
            </li>
            <li v-if="!store.isLoggedIn">
              <router-link
                to="/register"
                class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0"
                >Register</router-link
              >
            </li>
            <li>
              <router-link
                to="/about"
                class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0"
                >About</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <SidebarView
    @toggleSidebar="emit('toggleSidebar')" />
  </div>
</template>
