<script setup>
import { ref, onMounted } from "vue"
import { useForm } from "vee-validate";
import * as yup from "yup";
import { Action, url } from "../api";
import { useStore } from "../stores/store";

const users = ref([]);
const props = defineProps(["store"]);
const store = useStore();

onMounted(() => {
  Action.get(url + "users", (response) => {
    users.value = response.data;
  })
})

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required")
})

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: schema
});

const email = defineInputBinds("email");
const password = defineInputBinds("password");

const loginUser = handleSubmit((data) => {
  let chosen = users.value.filter((user) => {
    if(user.email == data.email && user.password == data.password) {
      return user
    }
  })

  if(chosen[0]) {
    localStorage.setItem("loggedInUser", chosen[0].uid);
    store.isLoggedIn = true;
    store.loggedInUser = chosen[0];
    store.openModal("successModal");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000)
  } else {
    store.openModal("failModal");
  }
})
</script>

<template>
  <div class="login">
    <form @submit="loginUser" class="mx-auto w-[400px] shadow-lg border border-gray-400 dark:border-gray-600 p-9 rounded-lg">
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          v-bind="email"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ errors.email }}</span></p>
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          v-bind="password"
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ errors.password }}</span></p>
      </div>
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          for="remember"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Remember me</label
        >
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    const store = useStore();

    if (to.path == "/login" && !store.isLoggedIn) {
      next();
    } else {
      next("/dashboard");
    }
  },
};
</script>
