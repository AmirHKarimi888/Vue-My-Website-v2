<script setup>
import { onMounted } from "vue"
import { useStore } from '../stores/store';
const store = useStore();

const props = defineProps(['loggedInUser']);

// onMounted(() => {
//   setTimeout(()=> {
//     console.log(store.loggedInUser);
//   }, 3000)
// })
console.log(store.loggedInUser);
</script>

<template>
  <div class="about">
    <div class="mt-20">About</div>
  </div>
</template>

<style>

</style>
