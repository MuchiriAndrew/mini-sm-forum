<template>
  <div class="flex justify-between flex-col items-center min-h-screen pt-10 gap-[8px]">
    <!-- <Modal v-if="isDeleting" @close="toggleModal"></Modal> -->

    <!-- <p class="text-2xl text-bold text-red-400">Welcome to Inertia.js with Vue and Tailwind CSS!</p> -->
    <div class="flex w-full flex-col items-center min-h-s pt-10 gap-[8px]">
         <Navbar class="mb-10"></Navbar>

         <div class="flex flex-col justify-center items-end gap-4 w-full px-3 md:w-auto">
           <Thread
           :posts="posts"
           ></Thread>
           <!-- <Post></Post> -->
           <!-- <UserPost @delete="toggleModal"></UserPost> -->
         </div>

    </div>

    <Replying
    class="sticky bottom-0"
    :isReplying="false"
    :post_id="null"
    ></Replying>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { useToast } from 'vue-toastification'

import Post from '../Components/Post.vue'
import UserPost from '../Components/UserPost.vue'
import Replying from '../Components/Replying.vue'
// import Modal from '../Components/Modal.vue'
import Thread from '../Components/Thread.vue'
import Navbar from '../Components/Navbar.vue'

const toast = useToast()

const { props } = usePage()
// console.log(props);

const flash = props.flash

const user = props.auth.user;
console.log(user);

if (flash.success) {
  toast.success(flash.success)

  //delete props.flash.success
  flash.success = null;
}

const posts = props.posts
console.log(posts);

// const isDeleting = ref(false)

// function toggleModal() {
//   isDeleting.value = !isDeleting.value
// }

function handleDelete() {
  console.log('Delete event received');
  // Perform the delete action here
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
