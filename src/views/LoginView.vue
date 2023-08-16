<script setup>
import { useStore } from '../stores/store';

const store = useStore();
</script>

<template>
  <div class="login">
    <div class="mt-20">Login</div>
  </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {

        const store = useStore();

        if(to.name == "login" && !store.isLoggedIn) {
            next();
        } else {
            next("/dashboard");
        }
    }
}
</script>
