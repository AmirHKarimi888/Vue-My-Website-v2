<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "./stores/store";

import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";

import AskBeforeModal from './components/modals/AskBeforeModal.vue';
import SuccessModal from './components/modals/SuccessModal.vue';
import FailModal from './components/modals/FailModal.vue';
import { Action, url } from "./api";

const store = useStore();



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
        store.loggedInUser = chosen[0];
        localStorage.setItem("loggedInUser", chosen[0].uid);
      } else {
        store.loggedInUser = {};
      }

    } else {
      store.isLoggedIn = false;
      store.loggedInUser = {};
      localStorage.setItem("loggedInUser", "");
    }
  })
});


</script>

<template>
  <div>
    <AskBeforeModal :store="store"/>
    <SuccessModal :store="store" />
    <FailModal :store="store" />
  </div>

  <header>
    <HeaderView
      :store="store"
    />
  </header>

  <main>
    <RouterView class="mt-[250px]"
    :store="store" />
  </main>

  <footer>
    <FooterView />
  </footer>
</template>
