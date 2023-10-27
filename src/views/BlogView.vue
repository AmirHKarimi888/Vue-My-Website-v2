<script setup>
import PostsView from '../components/PostsView.vue';
import { useTitle } from "@vueuse/core";

useTitle("Blog");

</script>

<template>
    <div class="blog">
        <PostsView />
    </div>
</template>