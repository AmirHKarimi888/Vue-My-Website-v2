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
        posts.value.reverse();
    });
});

const selectedPost = ref({ likedBy: [] });
const isLiked = ref(false);

const openPost = (id) => {
    posts.value.filter((post) => {
        if (post.id == id) {
            selectedPost.value = post;

            if (selectedPost.value.likedBy.includes(store.loggedInUser.email)) {
                isLiked.value = true;
            } else {
                isLiked.value = false;
            }
        }
    })


    document.querySelector("#post").classList.remove("hidden");
    document.querySelector("body").classList.add("overflow-y-hidden");

    setTimeout(() => {
        Action.delete(url + "posts/" + selectedPost.value.id)
            .then(() => {
                selectedPost.value.views = parseInt(selectedPost.value.views) + 1;
            })
            .then(() => {
                Action.post(url + "posts", selectedPost.value);
            })
    }, 6000)
}

const closePost = () => {
    selectedPost.value = {};
    document.querySelector("#post").classList.add("hidden");
    document.querySelector("body").classList.remove("overflow-y-hidden");
}

const likePost = () => {
    Action.delete(url + "posts/" + selectedPost.value.id)
        .then(() => {
            if (!selectedPost.value.likedBy.includes(store.loggedInUser.email)) {
                selectedPost.value.likedBy.push(store.loggedInUser.email);
                selectedPost.value.likes++;
                isLiked.value = true;
            } else {
                selectedPost.value.likedBy = selectedPost.value.likedBy.filter((person) => {
                    if (person != store.loggedInUser.email) {
                        return person;
                    }
                })
                selectedPost.value.likes--;
                isLiked.value = false;
            }
        })
        .then(() => {
            Action.post(url + "posts", selectedPost.value);
        })
}

</script>

<template>
    <div class="blog">
        <div class="posts mt-32 w-[70%] mx-auto">
            <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li @click="openPost(post.id)" @dblclick="likePost" v-for="(post, index) in posts" :key="index"
                    class="shadow-2xl aspect-square max-w-1/3 cursor-pointer bg-white dark:bg-slate-800">
                    <img :src="post.poster" alt="" class="w-[100%] aspect-square">
                </li>
            </ul>
        </div>

        <div @click.self="closePost" id="post"
            class="post overflow-y-scroll hidden fixed top-0 w-full z-50 h-screen backdrop-blur-md">
            <div
                class="my-10 p-3 rounded-lg mx-auto w-[75%] border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">

                <div class="postContents">
                    <div class="postHeader">
                        <p class="my-2 p-5 text-left text-gray-600 dark:text-gray-300 text-[180%]">
                            {{ selectedPost?.title }}
                        </p>

                        <ul
                            class="w-[100%] grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 items-center text-[75%] bg-gray-200 dark:bg-gray-600 rounded-md text-gray-600 dark:text-white my-2 p-3 gap-2 text-center">
                            <li><i class="fa fa-clock-o"></i> {{ selectedPost?.created }}</li>
                            <li><i class="fa fa-edit"></i> {{ selectedPost?.edited }}</li>
                            <li><i class="fa fa-user"></i> {{ selectedPost?.auther }}</li>
                            <li><i class="fa fa-eye"></i> {{ selectedPost?.views }}</li>
                            <li><i class="fa fa-heart"></i> {{ selectedPost?.likes }}</li>
                        </ul>
                    </div>

                    <div class="postBody">
                        <div v-for="(section, index) in selectedPost.contents" :key="index">
                            <p v-if="section.type == 'text'" :class="section.style">
                                {{ section.text }}
                            </p>

                            <div v-if="section.type == 'link'" :class="section.style">
                                <a :href="section.media">{{ section.text }}</a>
                            </div>

                            <img v-if="section.type == 'image'" :class="section.style" :alt="section.text"
                                :src="section.media" />
                            <audio v-if="section.type == 'audio'" :class="section.style" controls>
                                <source :src="section.media" type="audio/mpeg" />
                            </audio>
                            <video v-if="section.type == 'video'" :class="section.style" controls>
                                <source :src="section.media" type="video/mp4" />
                            </video>
                            <iframe v-if="section.type == 'iframe'" :class="section.style" :src="section.media"></iframe>

                        </div>
                    </div>

                    <div class="postFooter">
                        <button @click="likePost" class="ml-[5%] mt-3 p-3 rounded-[300%] aspect-square">
                            <i class="text-[150%] hover:text-red-500"
                                :class="isLiked ? 'fa fa-heart text-red-500' : 'fa fa-heart-o'"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>