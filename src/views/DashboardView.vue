<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../stores/store";

const store = useStore()

const route = useRoute();
const router = useRouter();


</script>

<template>
  <div class="admin">
    <div class="mt-20">Dashboard</div>
  </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {

        const store = useStore();

        if(store.isLoggedIn) {
            next();
        } else {
            next("/register");
        }
    }
}
</script>
