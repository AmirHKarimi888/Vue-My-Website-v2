<script setup>
import { onMounted } from "vue"
import { useStore } from '../stores/store';
import { Action } from "../api";
const store = useStore();

const props = defineProps(['loggedInUser']);

onMounted(() => {
  Action.get("http://localhost:8080/", (response) => {
    console.log(response.data);
  })
})
console.log(store.loggedInUser);
</script>

<template>
  <div class="about">
    <div class="mt-20">About</div>
  </div>
</template>

<style>

</style>
