<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { useStore } from "../stores/store";
import { Action, url } from "../api/index"
import * as yup from "yup";

const props = defineProps([]);
const router = useRouter();
const store = useStore();

const users = ref([]);

onMounted(() => {
  Action.get(url + "users", (response) => {
    users.value = response.data;
  }).then(() => {
    console.log(users.value);
  })
})

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  repeatPassword: yup.string().required().oneOf([yup.ref('password'), null], "Passwords don't match")
})
const alreadyExistsError = ref(false);
const registeredSuccessfully = ref(false);
const { defineInputBinds, errors, handleSubmit } = useForm({
  validationSchema: schema
});

const username = defineInputBinds('username');
const email = defineInputBinds('email');
const password = defineInputBinds('password');
const repeatPassword = defineInputBinds('repeatPassword');

const registerUser = handleSubmit((data) => {
  
  let rep = users.value.filter((user) => {
    if(user.email == data.email) {
      return user;
    }
  })

  let newUser = {
    id: users.value.length + 1,
    uid: Math.round(Math.random() * 1000000000000),
    username: data.username,
    email: data.email,
    password: data.password,
    avatar: `https://xsgames.co/randomusers/assets/avatars/pixel/${ users.value.length + 1 }.jpg`,
    admin: false
  }

  if(rep[0]) {
    alreadyExistsError.value = true;
    registeredSuccessfully.value = false;
    store.openModal("failModal");
  } else {
    alreadyExistsError.value = false;
    Action.post(url + "users", newUser).then(() => {
      registeredSuccessfully.value = true;
    }).then(() => {
      store.isLoggedIn = true;
      store.loggedInUser = newUser.uid;
    }).then(() => {
      localStorage.setItem("loggedInUser", newUser.uid);
    }).then(() => {
      store.openModal('successModal');
    }).then(() => {
      window.location.href = "/";
    })
  }
})
</script>

<template>
  <div class="register">
    <form
      @submit="registerUser"
      class="mx-auto w-[330px] shadow-lg border border-gray-400 dark:border-gray-600 p-9 rounded-lg"
    >
      <div class="mb-6">
        <label
          for="base-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Username</label
        >
        <input
          v-bind="username"
          type="text"
          id="base-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ errors.username }}</span></p>
      </div>
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
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ errors.password }}</span></p>
      </div>
      <div class="mb-6">
        <label
          for="repeat-password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Repeat password</label
        >
        <input
          v-bind="repeatPassword"
          type="password"
          id="repeat-password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ errors.repeatPassword }}</span></p>
      </div>
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          for="terms"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >I agree with the
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500"
            >terms and conditions</a
          ></label
        >
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register new account
      </button>
      <p v-if="alreadyExistsError" class="mt-5 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> User already exists!</p>
      <p v-if="registeredSuccessfully" class="mt-5 text-sm text-green-600 dark:text-green-500"><span class="font-medium">Alright!</span> Registered successfully!</p>
      <p class="mt-5 text-sm text-gray-700 dark:text-gray-400"> Do you already have an account? <router-link to="/login" class="text-blue-500">Login</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    const store = useStore();

    if (to.name == "register" && !store.isLoggedIn) {
      next();
    } else {
      next("/dashboard");
    }
  },
};
</script>
