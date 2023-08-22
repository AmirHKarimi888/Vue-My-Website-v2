<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../stores/store";
import * as filestack from "filestack-js";
import { Action, url } from "../api";

const props = defineProps(["store"]);

const apiKey = "AWOK4L9h4SROT147VanQQz";
const client = filestack.init(apiKey);

const posts = ref([]);
const posterUrl = ref("");
const title = ref("");

onMounted(() => {
  Action.get(url + "posts", (response) => {
    posts.value = response.data;
  })
})

const openUploader = () => {
  client.picker({
    transformations: {
      circle: false,
      crop: {
        force: true,
      },
    },
    onUploadDone: async (data) => {
      posterUrl.value = data.filesUploaded[0].url;
    }
  }).open();
}

const createPost = () => {
  const newPost = {
    id: posts.value.length + 1,
    poster: posterUrl.value,
    title: title.value,
    content: []
  }

  Action.post(url + "posts", newPost)
  .then(() => {
    posts.value = [...posts.value, newPost];
  })
}

</script>

<template>
  <div class="dashboard">
    <form v-if="store.loggedInUser.admin"
      class="mx-auto w-[400px] shadow-lg border border-gray-400 dark:border-gray-600 p-9 rounded-lg">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input v-model="title" type="text" id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="post title" required>
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload</label>
        <button @click="openUploader" type="button"
          class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Click
          to upload the poster</button>
      </div>
      <button @click="createPost" type="button"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Create
        Post</button>
    </form>

    <div class="posts mt-32 w-[66%] mx-auto">

      <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="(post, index) in posts" :key="index" class="border border-gray-400 dark:border-gray-600 p-5 shadow-lg aspect-square max-w-1/3 rounded-lg">
          <p class="my-5 text-right text-gray-600 dark:text-gray-300">{{ post?.createdAt }}</p>
          <img :src="post?.poster" alt="" class="aspect-square">
          <p class="mt-5 text-center text-gray-600 dark:text-gray-300">{{ post?.title }}</p>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {

    const store = useStore();

    if (store.isLoggedIn) {
      next();
    } else {
      next("/register");
    }
  }
}
</script>
