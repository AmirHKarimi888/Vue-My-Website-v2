<script setup>
import { useStore } from '../stores/store';

const store = useStore();
</script>

<template>
  <div class="register">
    <div class="mt-20">Register</div>
  </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {

        const store = useStore();

        if(to.name == "register" && !store.isLoggedIn) {
            next();
        } else {
            next("/dashboard");
        }
    }
}
</script>
