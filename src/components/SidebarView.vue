<script setup>
import { ref } from 'vue';

const props = defineProps(["store"]);
</script>

<template>
  <div
    class="sidebar-backdrop fixed top-0 z-30 backdrop-blur-sm bg-white/5 h-screen"
    id="sidebar-backdrop"
    @click.self="store.toggleSidebar()"
  >
    <div
      id="sidebar"
      class="fixed top-0 right-0 h-screen p-4 border-l border-t border-gray-300 dark:border-gray-600 overflow-y-auto transition-transform translate-x-0 bg-white w-64 dark:bg-gray-800"
      tabindex="-1"
      aria-labelledby="drawer-disable-body-scrolling-label"
    >
      <button
        @click="store.toggleSidebar()"
        type="button"
        data-drawer-hide="drawer-disable-body-scrolling"
        aria-controls="drawer-disable-body-scrolling"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>

      <div class="bg-gray-200 mt-10 p-3 rounded-lg border border-gray-400 dark:bg-gray-700 dark:border-gray-500 w-full text-center border-b dark:border-b-gray-600 text-gray-700 dark:text-gray-200">
        <img class="w-10 h-10 rounded-full mx-auto border" :src="store.loggedInUser.avatar" alt="Rounded avatar">
        <h4 class="mt-2">{{ store.loggedInUser.username }}</h4>
        <p class="mt-2">{{ store.loggedInUser.email }}</p>
        <p v-if="store.loggedInUser.admin" class="mt-2 text-green-500">Admin</p>
      </div>

      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <li>
            <router-link
              to="/dashboard"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <i class="fa fa-dashboard"></i>
              <span class="ml-3">Dashboard</span>
            </router-link>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <i class="fa fa-user"></i>
              <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
            </a>
          </li>

          <li @click="store.openModal('askBeforeModal', 'signOut')">
            <a
              class="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <i class="fa fa-sign-out"></i>
              <span class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
