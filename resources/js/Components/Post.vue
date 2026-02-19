<template>
    <div class="comment flex flex-col gap-[8px]">

        <!-- <p>Members Comment</p> -->
        <div
            class="w-auto h-auto max-w-[730px] bg-white rounded-[8px] flex flex-col md:flex-row">

            
            <div class="w-[10%] justify-center items-start py-[24px] hidden md:flex">
                <div class="bg-light-gray h-[100px] w-[40px] flex flex-col justify-evenly items-center rounded-[10px]">
                    <p class="font-rubik text-light-grayish-blue font-medium">+</p>
                    <p class="font-rubik text-moderate-blue font-medium">{{ post.upvotes }}</p>
                    <p class="font-rubik text-light-grayish-blue font-medium">-</p>
                </div>
            </div>

            <div class="w-full md:w-[90%] justify-center px-5 pt-[24px] md:py-[24px] md:pr-12 flex flex-col h-[80%] md:h-full">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-[16px]">
                        <img class="w-[32px] h-[32px] rounded-full" :src="profile_photo_url" alt="">

                        <h3 class="font-rubik font-semibold text-dark-blue ">{{ post.user.name }}</h3>

                        <p class="font-rubik text-grayish-blue ">{{ post.time }}</p>

                    </div>

                    <div 
                    @click="toggleReplying"
                    class="items-center gap-2 hidden md:flex">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.227189 4.31583L5.0398 0.159982C5.46106 -0.203822 6.125 0.0915222 6.125 0.656646V2.8456C10.5172 2.89589 14 3.77618 14 7.93861C14 9.61864 12.9177 11.283 11.7214 12.1532C11.348 12.4247 10.816 12.0839 10.9536 11.6437C12.1935 7.67857 10.3655 6.62588 6.125 6.56484V8.96878C6.125 9.5348 5.46056 9.82883 5.0398 9.46545L0.227189 5.30918C-0.0755195 5.04772 -0.0759395 4.57766 0.227189 4.31583Z"
                                fill="#5357B6" />
                        </svg>
                        <p class="cursor-pointer font-rubik text-moderate-blue font-medium">Reply</p>
                    </div>



                </div>

                <div class="mt-[15px]">
                    <FormattedContent :content="post.content" />
                </div>
            </div>

            <div class=" h-[20%] flex md:hidden justify-between items-center p-5">
                <div class="bg-light-gray w-[100px] h-[40px] flex justify-evenly items-center rounded-[10px]">
                    <p class="font-rubik text-light-grayish-blue font-medium">+</p>
                    <p class="font-rubik text-moderate-blue font-medium">{{ post.upvotes }}</p>
                    <p class="font-rubik text-light-grayish-blue font-medium">-</p>
                </div>

                <div
                @click="toggleReplying"
                class="items-center gap-2 flex">
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.227189 4.31583L5.0398 0.159982C5.46106 -0.203822 6.125 0.0915222 6.125 0.656646V2.8456C10.5172 2.89589 14 3.77618 14 7.93861C14 9.61864 12.9177 11.283 11.7214 12.1532C11.348 12.4247 10.816 12.0839 10.9536 11.6437C12.1935 7.67857 10.3655 6.62588 6.125 6.56484V8.96878C6.125 9.5348 5.46056 9.82883 5.0398 9.46545L0.227189 5.30918C-0.0755195 5.04772 -0.0759395 4.57766 0.227189 4.31583Z"
                            fill="#5357B6" />
                    </svg>
                    <p class="font-rubik text-moderate-blue font-medium">Reply</p>
                </div>

            </div>
            
        </div>

        <Replying 
        v-if="showReplying"
        :isReplying="showReplying"
        :post_id="post.id"
        ></Replying>
    </div>
</template>

<script>
import Replying from './Replying.vue';
import FormattedContent from './FormattedContent.vue';
export default {
    name: 'Post',

    components: {
        Replying,
        FormattedContent,
    },

    props: {
        post: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            reply:true,
            showReplying: false,
            profile_photo_url: this.post.user.profile_picture_path
          ? `/storage/${this.post.user.profile_picture_path}`
          : '/images/avatars/default.jpg',
        };
    },

    methods: {
        toggleReplying() {
            this.showReplying = !this.showReplying;

            // this.$emit('reply', this.showReplying);

            //get the input with an id of reply_type and set its value to 'reply'
            // document.getElementById('reply_type').value = 'reply';
        },
    },
};
</script>