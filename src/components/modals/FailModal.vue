<script setup>
const props = defineProps(["store"]);
</script>

<template>
    <div @click.self="store.closeModal('failModal')" id="failModal" class="failModal fixed top-0 hidden w-full h-screen z-50 backdrop-blur-sm">
        <div tabindex="-1"
            class="fixed top-[200px] left-[17%] md:left-[20%] lg:left-[36%] p-4 max-h-full">
            <div class="relative w-full max-w-md max-h-full">
                <div class="relative border border-gray-400 bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button"
                        @click="store.closeModal('failModal')"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <i class="fa fa-times-circle-o mx-auto mb-4 text-red-500 text-[500%]"></i>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">The process was failed. Try again.</h3>
                </div>
            </div>
        </div>
    </div>
</div></template>