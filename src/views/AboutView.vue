<script setup>
import { ref, onMounted } from "vue"
import { useStore } from '../stores/store';
import { Action, url } from "../api";
import { useTitle } from "@vueuse/core"

const store = useStore();

const props = defineProps(['loggedInUser']);

const links = ref([]);

onMounted(() => {
  useTitle("About");
  Action.get(url + "posts", (response) => {
    links.value = response.data;
  })
  .then(() => {
    links.value = links.value.reverse();
  })
    .then(() => {
      links.value = links.value.filter((link) => {
        if (link.type == "link") {
          return link;
        }
      })
    })
})

const title = ref("");
const link = ref("");
const icon = ref("");


const addLink = () => {
  let initial = 0;
  for (let link of links.value) {
    if (link.sid > initial) {
      initial = link.sid;
    }
  }
  const newLink = {
    id: initial + 1,
    sid: initial + 1,
    type: "link",
    auther: store.loggedInUser.email,
    title: title.value,
    link: link.value,
    icon: icon.value
  };

  Action.post(url + "posts", newLink)
    .then(() => {
      links.value = [...links.value, newLink];
    })
    .then(() => {
      title.value = "";
      link.value = "";
      icon.value = "";
    })
    .then(() => {
      links.value.sort((a, b) => {
        return a.sid - b.sid;
      });
      links.value.reverse();
    })
    .then(() => {
      store.openModal('successModal');
    })
    .catch(() => {
      store.openModal('failModal');
    })
}

const deleteLink = (id) => {
  Action.delete(url + "posts/" + id).then(() => {
    links.value = links.value.filter((link) => {
      if (link.id != id) {
        return link;
      }
    });
  })
  .then(() => {
    store.openModal('successModal');
  })
  .catch(() => {
    store.openModal('failModal');
  })
}

</script>

<template>
  <div class="about">
    <form v-if="store.loggedInUser.admin"
      class="mx-auto w-[330px] mt-32 shadow-lg border border-gray-400 dark:border-zinc-700 p-9 rounded-lg bg-white dark:bg-zinc-900">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input v-model="title" type="text" id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="post title" />
      </div>
      <div class="mb-6">
        <label for="poster" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link</label>
        <input v-model="link" type="text" id="poster"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="post poster" />
      </div>
      <div class="mb-6">
        <label for="poster" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Icon</label>
        <input v-model="icon" type="text" id="poster"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="post poster" />
      </div>
      <button type="button" @click="addLink"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Create Link
      </button>
    </form>

    <ul class="links mx-auto mt-28 w-[330px] grid grid-cols-1 gap-3">
        <li 
          v-for="link in links" :key="link.id"
          class="shadow-lg border border-gray-400 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-gray-700 dark:text-white flex grid-cols-2 gap-7">
          <a :href="link?.link" class="flex grid-cols-2 gap-7 justify-center items-center text-[150%] p-5">
          <div><i :class="link?.icon"></i></div>
          <div>{{ link?.title }}</div>
          </a>
          <button v-if="store.loggedInUser.admin" @click="deleteLink(link.id)" class="text-red-500 my-3">
            <i class="fa fa-trash"></i>
          </button>
        </li>
    </ul>
  </div>
</template>

<style></style>
