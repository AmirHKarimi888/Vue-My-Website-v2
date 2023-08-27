<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import LastPostsView from "../components/LastPostsView.vue";

const router = useRouter();

const activeAnimateFadeInUp = (id) => {
  document
    .querySelector(`#${id}`)
    .classList.add("animate__animated", "animate__fadeInUp");
};
const deActiveAnimateFadeInUp = (id) => {
  document
    .querySelector(`#${id}`)
    .classList.remove("animate__animated", "animate__fadeInUp");
};
const activeAnimateFadeInDown = (id) => {
  document
    .querySelector(`#${id}`)
    .classList.add("animate__animated", "animate__fadeInDown");
};

const props = defineProps(["store"]);
</script>

<template>
  <div class="home">
    <section id="intro"
      class="h-screen mt-[-177px] p-6 bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-cover bg-fixed bg-center bg-gray-700 bg-blend-multiply grid justify-center items-center">
      <div id="introContent"
        class="animate__animated animate__fadeInUp px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 class="mb-4 text-[150%] font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Welcome To My Website
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          This is my official website. You can see my posts and projects here!
        </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a href="#projectsIntro" @click="deActiveAnimateFadeInUp('projectsIntroContent')"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Get started
            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
          <!-- <a href="#"
            class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
            Learn more
          </a> -->
        </div>
      </div>
    </section>

    <section @mouseenter="activeAnimateFadeInUp('projectsIntroContent')"
      @touchstart="activeAnimateFadeInUp('projectsIntroContent')" id="projectsIntro"
      class="h-screen bg-center bg-no-repeat bg-blend-multiply grid justify-center items-center bg-white dark:bg-gray-800 dark:border-gray-600">
      <div id="projectsIntroContent" class="md:flex lg:flex sm:grid mt-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div
          class="p-8 text-left text-lg bg-local bg-center bg-no-repeat bg-cover bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken md:w-1/2 lg:w-1/2 grid justify-center items-center"
          style="background-image: url(/docs/images/dashboard-overview.png)">
          <p
            class="animate__animated animate__fadeInUp max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-gray-700 dark:text-white">
            My Projects <br /><br />
            <button type="button"
              class="inline-flex items-center px-2.5 py-1.5 w-[120px] text-xs font-medium text-center text-gray-700 dark:text-white border border-gray-500 rounded-lg hover:bg-white dark:hover:text-gray-900 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700">
              Get started
              <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </p>
        </div>

        <div
          class="animate__animated animate__fadeInUp p-10 text-left bg-local bg-center bg-no-repeat bg-cover bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken md:w-1/2 lg:w-1/2"
          style="background-image: url(/docs/images/dashboard-overview.png)">
          <img src="/assets/1.png" class="" />
        </div>
      </div>
    </section>

    <section @mouseenter="activeAnimateFadeInUp('blogIntroContent')"
      @touchstart="activeAnimateFadeInDown('blogIntroContent')" id="blogIntro"
      class="h-screen bg-center bg-no-repeat bg-blend-multiply grid justify-center items-center bg-white dark:bg-gray-800 dark:border-gray-600">
      <div id="blogIntroContent" class="md:flex lg:flex sm:grid mt-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div
          class="animate__animated animate__fadeInUp p-10 text-left bg-local bg-center bg-no-repeat bg-cover bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken md:w-1/2 lg:w-1/2"
          style="background-image: url(/docs/images/dashboard-overview.png)">
          <img src="/assets/2.png" class="" />
        </div>
        <div
          class="p-8 text-left text-lg bg-local bg-center bg-no-repeat bg-cover bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken md:w-1/2 lg:w-1/2 grid justify-center items-center"
          style="background-image: url(/docs/images/dashboard-overview.png)">
          <p
            class="animate__animated animate__fadeInUp max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-gray-700 dark:text-white">
            Blog <br /><br />
            <button type="button" @click="router.push('/blog')"
              class="inline-flex items-center px-2.5 py-1.5 w-[120px] text-xs font-medium text-center text-gray-700 dark:text-white border border-gray-500 rounded-lg hover:bg-white dark:hover:text-gray-900 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700">
              Go To Blog
              <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </p>
        </div>
      </div>
    </section>

    <section @mouseenter="activeAnimateFadeInUp('contactIntroContent')"
      @touchstart="activeAnimateFadeInUp('contactIntroContent')" id="contactIntro"
      class="h-screen bg-center bg-no-repeat bg-blend-multiply grid justify-center items-center bg-white dark:bg-gray-800 dark:border-gray-600">
      <div id="contactIntroContent" class="md:flex lg:flex sm:grid mt-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div
          class="p-8 text-left text-lg bg-local bg-center bg-no-repeat bg-cover bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken md:w-1/2 lg:w-1/2 grid justify-center items-center"
          style="background-image: url(/docs/images/dashboard-overview.png)">
          <p
            class="animate__animated animate__fadeInUp max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-gray-700 dark:text-white">
            Social Media <br /><br />
            <button type="button"
              class="inline-flex items-center px-2.5 py-1.5 w-[120px] text-xs font-medium text-center text-gray-700 dark:text-white border border-gray-500 rounded-lg hover:bg-white dark:hover:text-gray-900 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700">
              Contact
              <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </p>
        </div>

        <div
          class="animate__animated animate__fadeInUp p-10 text-left bg-local bg-center bg-no-repeat bg-cover bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken md:w-1/2 lg:w-1/2"
          style="background-image: url(/docs/images/dashboard-overview.png)">
          <img src="/assets/4.png" class="" />
        </div>
      </div>
    </section>

    <p class="mt-40 mb-10 text-center text-[180%] text-gray-600 dark:text-white">
      Last Posts
    </p>
    <LastPostsView />
  </div>
</template>
