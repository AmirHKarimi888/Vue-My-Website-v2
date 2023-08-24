<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../stores/store";
import { Action, url } from "../api";

const props = defineProps(["store"]);
const store = useStore();
const posts = ref([]);

onMounted(() => {
    Action.get(url + "posts", (response) => {
        posts.value = response.data;
        posts.value.sort((a, b) => {
            return parseInt(a.sid) - parseInt(b.sid);
        });
    });
});

const selectedPost = ref({});

const openPost = (id) => {
    posts.value.filter((post) => {
        if(post.id == id) {
            selectedPost.value = post;
        }
    })


    document.querySelector("#post").classList.remove("hidden");
    document.querySelector("body").classList.add("overflow-y-hidden");
}

const closePost = () => {
  selectedPost.value = {};
  document.querySelector("#post").classList.add("hidden");
  document.querySelector("body").classList.remove("overflow-y-hidden");
}
</script>

<template>
    <div class="blog">
        <div class="posts mt-32 w-[70%] mx-auto">
            <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li @click="openPost(post.id)" v-for="(post, index) in posts" :key="index" class="shadow-2xl aspect-square max-w-1/3 cursor-pointer">
                    <img :src="post.poster" alt="" class="w-[100%] aspect-square">
                </li>
            </ul>
        </div>

      <div @click.self="closePost" id="post" class="post overflow-y-scroll hidden fixed top-0 w-full z-50 h-screen backdrop-blur-md">
      <div
        class="my-10 p-3 rounded-lg mx-auto w-[75%] border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">

        <div class="postContents">
          <div class="postHeader">
            <p class="my-5 text-center text-gray-600 dark:text-gray-300">
              <!-- <i class="fa fa-eye"></i> -->
            </p>
          </div>

          <div class="postBody">
            <div v-for="(section, index) in selectedPost.contents" :key="index">
              <p v-if="section.type == 'text'" :class="section.style">
                {{ section.text }}
              </p>

              <div v-if="section.type == 'link'" :class="section.style">
                <a :href="section.media">{{ section.text }}</a>
              </div>

              <img v-if="section.type == 'image'" :class="section.style" :alt="section.text" :src="section.media" />
              <audio v-if="section.type == 'audio'" :class="section.style" controls>
                <source :src="section.media" type="audio/mpeg" />
              </audio>
              <video v-if="section.type == 'video'" :class="section.style" controls>
                <source :src="section.media" type="video/mp4" />
              </video>
              <iframe v-if="section.type == 'iframe'" :class="section.style" :src="section.media"></iframe>

            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
</template>