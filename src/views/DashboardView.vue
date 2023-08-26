<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../stores/store";
import * as filestack from "filestack-js";
import { Action, url } from "../api";

const props = defineProps(["store"]);
const store = useStore();
const apiKey = "AWOK4L9h4SROT147VanQQz";
const client = filestack.init(apiKey);

const posts = ref([]);

const title = ref("");
const type = ref("type");
const text = ref("");
const media = ref("");
const style = ref("");
const globalEditStatus = ref(false);

onMounted(() => {
  Action.get(url + "posts", (response) => {
    posts.value = response.data;
    posts.value.sort((a, b) => {
      return parseInt(a.sid) - parseInt(b.sid);
    });
    posts.value.reverse();
  });
});

const openUploader = () => {
  client
    .picker({
      transformations: {
        circle: false,
        crop: {
          force: true,
        },
      },
      onUploadDone: async (data) => {
        media.value = data.filesUploaded[0].url;
        document.querySelector("#fileLink").innerHTML =
          data.filesUploaded[0].url;
        document.querySelector("#postFileLink").innerHTML =
          data.filesUploaded[0].url;
      },
    })
    .open();
};

var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
  }






const createPost = () => {
  // const max = ref(0);
  // posts.value.map((post) => {
  //   max.value = Math.max(post.sid);
  // })

  let initial = 0;
  for(let post of posts.value) {
    if(post.sid > initial) {
      initial = post.sid;
    }
  }
  console.log(initial)

  const newPost = {
    id: initial + 1,
    sid: initial + 1,
    auther: store.loggedInUser.email,
    created: today + " at " + formatAMPM(new Date),
    edited: "",
    poster: media.value,
    title: title.value,
    likedBy: [],
    likes: 0,
    views: 0,
    comments: [],
    contents: [],
    editStatus: false,
  };

  Action.post(url + "posts", newPost)
    .then(() => {
      posts.value = [...posts.value, newPost];
    })
    .then(() => {
      title.value = "";
      media.value = "";
    })
    .then(() => {
      posts.value.sort((a, b) => {
        return a.sid - b.sid;
      })
      posts.value.reverse();
    })
};

const globalId = ref(0);
const globalSid = ref(0);
const selectedPost = ref({});

const startEditingPostHeader = (id, sid) => {

  posts.value.filter((post) => {
    if (post.sid === sid) {
      if (post.editStatus == false) {
        post.editStatus = true;
        globalEditStatus.value = true;
        globalId.value = id;
        globalSid.value = sid;
        selectedPost.value = post;
        title.value = post.title;
        media.value = post.poster;
      } else {
        post.editStatus = false;
        globalEditStatus.value = false;
        globalId.value = 0;
        globalSid.value = 0;
        selectedPost.value = "";
        title.value = "";
        media.value = "";
      }
    }
  });
};

const editPostHeader = () => {

  // let contents = ref([]);
  // posts.value.filter((post) => {
  //   if (post.sid == globalSid.value) {
  //     contents.value = post.contents;
  //   }
  // });

  Action.delete(url + "posts/" + globalId.value)
    .then(() => {
      Action.post(url + "posts", {
        ...selectedPost.value, 
        edited: today + " at " + formatAMPM(new Date),
        poster: media.value,
        title: title.value,
        editStatus: false,
      });
    })
    .then(() => {
      posts.value.filter((post) => {
        if (post.sid == globalSid.value) {
          post.edited = today + " at " + formatAMPM(new Date);
          post.title = title.value;
          post.poster = media.value;
        }
      });
    })
    .then(() => {
      posts.value.filter((post) => {
        if (post.sid == globalSid.value) {
          post.editStatus = false;
        }
      });
      globalEditStatus.value = false;
      selectedPost.value = {};
      globalId.value = 0;
      globalSid.value = 0;
      title.value = "";
      media.value = "";
    });
};

const deletePost = (id) => {
  Action.delete(url + "posts/" + id)
  .then(() => {
    posts.value = posts.value.filter((post) => {
      if(post.id != id) {
        return post;
      }
    })
  })
}























const openEditMore = (sid) => {
  posts.value.filter((post) => {
    if (post.sid == sid) {
      selectedPost.value = post;
    }
  });
  document.querySelector("#editing").classList.remove("hidden");
  document.querySelector("body").classList.add("overflow-y-hidden");
};

const createSection = (id) => {
  let initial = 0;
  for(let section of selectedPost.value.contents) {
    if(section.id > initial) {
      initial = section.id;
    }
  }

  const newSection = {
    id: initial + 1,
    type: type.value,
    text: text.value,
    media: media.value,
    style: style.value,
    editStatus: false,
  };

  Action.delete(url + "posts/" + id)
    .then(() => {
      selectedPost.value.contents.push(newSection);
      selectedPost.value.edited = today + " at " + formatAMPM(new Date);
    })
    .then(() => {
      Action.post(url + "posts", selectedPost.value);
    })
    .then(() => {
      type.value = "";
      text.value = "";
      media.value = "";
      style.value = "";
    });
};

const selectedSectionId = ref(0);
const startEditingSection = (id) => {
  selectedPost.value.contents.filter((section) => {
    if (section.id == id) {
      if (section.editStatus == false) {
        section.editStatus = true;
        globalEditStatus.value = true;
        selectedSectionId.value = section.id;
        type.value = section.type;
        text.value = section.text;
        media.value = section.media;
        style.value = section.style;
      } else {
        section.editStatus = false;
        globalEditStatus.value = false;
        selectedSectionId.value = 0;
        type.value = "";
        text.value = "";
        media.value = "";
        style.value = "";
      }
    }
  });
};

const editSection = (id) => {
  Action.delete(url + "posts/" + id)
  .then(() => {
    selectedPost.value.edited = today + " at " + formatAMPM(new Date);
    selectedPost.value.contents.filter((section) => {
      if(section.id == selectedSectionId.value) {
        section.type = type.value;
        section.text = text.value;
        section.media = media.value;
        section.style = style.value;
        section.editStatus = false;
      }
    })
  })
  .then(() => {
      selectedPost.value.contents.sort((a, b) => {
        return a.id - b.id;
      });
    })
    .then(() => {
      Action.post(url + "posts", selectedPost.value);
    })
    .then(() => {
      type.value = "";
      text.value = "";
      media.value = "";
      style.value = "";
      globalEditStatus.value = false;

      selectedPost.value.contents.filter((section) => {
        if (section.id == selectedSectionId.value) {
          section.editStatus = false;
        }
      });

      selectedSectionId.value = 0;
    });
};

const deleteSection = (id) => {
  Action.delete(url + "posts/" + selectedPost.value.id)
  .then(() => {
    selectedPost.value.contents = selectedPost.value.contents.filter((section) => {
      if(section.id != id) {
        return section;
      }
    })
  })
  .then(() => {
    Action.post(url + "posts", selectedPost.value)
  })
}

const cancelEditing = () => {
  selectedPost.value = {};
  document.querySelector("#editing").classList.add("hidden");
  document.querySelector("body").classList.remove("overflow-y-hidden");
};
</script>

<template>
  <div class="dashboard">
    <div class="mx-auto w-[330px] shadow-lg text-center text-gray-600 dark:text-white border border-gray-400 dark:border-gray-600 p-9 rounded-lg bg-white dark:bg-slate-800">
      <img class="w-20 h-20 rounded-full mx-auto border" :src="store.loggedInUser.avatar" alt="Rounded avatar">
        <h4 class="mt-2">{{ store.loggedInUser.username }}</h4>
        <p class="mt-2">{{ store.loggedInUser.email }}</p>
        <p v-if="store.loggedInUser.admin" class="mt-2 text-green-500">Admin</p>
    </div>
    <form v-if="store.loggedInUser.admin"
      class="mx-auto w-[330px] mt-32 shadow-lg border border-gray-400 dark:border-gray-600 p-9 rounded-lg bg-white dark:bg-slate-800">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input v-model="title" type="text" id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="post title" />
      </div>
      <div class="mb-6">
        <label for="poster" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Poster</label>
        <input v-model="media" type="text" id="poster"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="post poster" />
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload</label>
        <button @click="openUploader" type="button"
          class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Click to upload the poster
        </button>
        <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          File Link: <a id="fileLink" :href="media"></a>
        </p>
      </div>
      <button v-if="!globalEditStatus" @click="createPost" type="button"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Create Post
      </button>
      <button v-if="globalEditStatus" @click="editPostHeader" type="button"
        class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Edit Post Header
      </button>
    </form>

    <div v-if="store.loggedInUser.admin" class="posts mt-32 w-[66%] mx-auto">
      <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="(post, index) in posts" :key="index"
          class="border border-gray-400 dark:border-gray-600 p-5 shadow-lg aspect-square max-w-1/3 rounded-lg bg-white dark:bg-slate-800">
          <div class="my-5 mx-auto text-center">
            <button class="mx-3">
              <i @click="startEditingPostHeader(post.id, post.sid)" :class="post.editStatus
                  ? 'text-green-500'
                  : 'text-gray-600 dark:text-white'
                " class="fa fa-edit"></i>
            </button>

            <button @click="deletePost(post.id)" class="mx-3">
              <i class="fa fa-trash text-red-500"></i>
            </button>
          </div>
          <p class="my-5 text-right text-gray-600 dark:text-gray-300">
            {{ post?.created }}
          </p>
          <p class="my-5 text-right text-gray-600 dark:text-gray-300">
            {{ post?.edited }}
          </p>
          <img :src="post?.poster" alt="" class="mx-auto w-[90%] aspect-square" />
          <p class="mt-5 text-center text-gray-600 dark:text-gray-300">
            {{ post?.title }}
          </p>
          <div class="mx-auto text-center mt-5">
            <button @click="openEditMore(post.sid)" type="button"
              class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Edit More
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div id="editing" class="editing overflow-y-scroll hidden fixed top-0 w-full z-50 h-screen backdrop-blur-md">
      <div
        class="my-10 p-3 rounded-lg mx-auto w-[72%] border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
        <form v-if="store.loggedInUser.admin"
          class="mx-auto my-10 w-[90%] shadow-lg border border-gray-400 dark:border-gray-600 p-9 rounded-lg">
          <div class="mb-6">
            <label for="countries" class="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag
              Type</label>
            <select v-model="type" id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="text">Text</option>
              <option value="link">Link</option>
              <option value="image">Image</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="iframe">Iframe</option>
            </select>
            <label for="text" class="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Text</label>
            <textarea v-model="text" type="text" id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="text"></textarea>
            <label for="media" class="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Media</label>
            <textarea v-model="media" type="text" id="media"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="media"></textarea>

            <label for="style" class="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Style</label>
            <textarea v-model="style" type="text" id="style"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="style"></textarea>
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload</label>
            <button @click="openUploader" type="button"
              class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Click to upload what you want
            </button>
            <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              File Link: <a id="postFileLink" :href="media"></a>
            </p>
          </div>
          <button @click="createSection(parseInt(selectedPost.id))" v-if="!globalEditStatus" type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Create Section
          </button>
          <button @click="editSection(parseInt(selectedPost.id))" v-if="globalEditStatus" type="button"
            class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Edit Section
          </button>
        </form>

        <div class="postContents">
          <div class="postHeader">
            <p class="text-[200%] text-center text-gray-600 dark:text-gray-300">
              Header
            </p>
            <p class="mt-5 text-center text-gray-600 dark:text-gray-300">
              {{ selectedPost?.title }}
            </p>

            <p class="my-5 text-center text-gray-600 dark:text-gray-300">
              Created At: {{ selectedPost?.created }}
            </p>
            <p class="my-5 text-center text-gray-600 dark:text-gray-300">
              Edited At: {{ selectedPost?.edited }}
            </p>
            <p class="my-5 text-center text-gray-600 dark:text-gray-300">
              {{ selectedPost?.views }} Views
            </p>
            <p class="my-5 text-center text-gray-600 dark:text-gray-300">
              {{ selectedPost?.likes }} Likes
            </p>
            <img :src="selectedPost?.poster" alt="" class="mx-auto w-[90%] aspect-square" />
          </div>

          <div class="postBody">
            <p class="mt-10 text-[200%] text-center text-gray-600 dark:text-gray-300">
              Body
            </p>
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

              <div class="my-5 mx-auto text-center">
                <button @click="startEditingSection(section.id)" class="mx-2">
                  <i :class="section.editStatus
                      ? 'text-green-500'
                      : 'text-gray-600 dark:text-white'
                    " class="fa fa-edit"></i>
                </button>

                <button @click="deleteSection(section.id)" class="mx-2">
                  <i class="fa fa-trash text-red-500"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto text-center mt-5">
          <button @click="cancelEditing" type="button"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Cancel Editing
          </button>
        </div>
      </div>
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
  },
};
</script>
