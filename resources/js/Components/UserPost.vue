<template>
    <Modal v-if="isDeleting" @close="toggleModal"
    :post_id="post.id"
    :toggleModal="toggleModal"
    ></Modal>


    <div class="comment w-full md:w-[730px] md:max-w-full flex justify-end items-center">

        <div
            class="h-auto min-w-full md:min-w-full bg-white rounded-[8px] flex flex-col md:flex-row md:justify-center items-center md:items-start overflow-hidden">


            <div class="w-[10%] justify-center items-start py-[24px] hidden md:flex">
                <div class="bg-light-gray h-[100px] w-[40px] flex flex-col justify-evenly items-center rounded-[10px]">
                    <p class="font-rubik text-light-grayish-blue font-medium">+</p>
                    <p class="font-rubik text-moderate-blue font-medium">{{ post.upvotes }}</p>
                    <p class="font-rubik text-light-grayish-blue font-medium">-</p>
                </div>
            </div>

            <form
            @submit.prevent="submit"
                class="w-full md:w-[90%] justify-center px-5 pt-[24px] md:py-[24px] md:pr-12 flex flex-col h-[80%] md:h-full">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-[16px]">
                        <img class="w-[32px] h-[32px] rounded-full" :src="profile_photo_url" alt="">

                        <h3 class="font-rubik font-semibold text-dark-blue ">{{ post.user.name }}</h3>

                        <div class="w-[36px] h-[19px] bg-moderate-blue flex justify-center items-center rounded-[2px]">
                            <p class="font-rubik text-white text-[13px] font-medium">you</p>

                        </div>

                        <p class="font-rubik text-grayish-blue ">{{ post.time }}</p>

                    </div>

                    <div class="items-center gap-[23.86px] hidden md:flex">
                        <div 
                        
                        @click="toggleModal" class="cursor-pointer items-center gap-[3px] flex">
                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8.64458 1.16667H11.5261V2.33333H0V1.16667H2.88153L3.84633 0H7.67981L8.64458 1.16667ZM2.68944 14C1.8441 14 1.15261 13.3017 1.15261 12.4479V3.5H10.3735V12.4479C10.3735 13.3017 9.682 14 8.8367 14H2.68944Z"
                                    fill="#ED6368" />
                            </svg>

                            <p class="font-rubik text-soft-red font-medium">Delete</p>
                        </div>

                        <div @click="toggleEdit()" class="cursor-pointer items-center gap-[3px] flex">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.0813 0.474468L13.4788 2.87199C14.1491 3.51055 14.1765 4.57097 13.5401 5.24327L5.66499 13.1184C5.37977 13.4012 5.00593 13.5773 4.60623 13.6171L0.957442 13.9496H0.878691C0.646111 13.951 0.422565 13.8596 0.257434 13.6959C0.0728398 13.5119 -0.0201832 13.2553 0.00368177 12.9959L0.379936 9.34706C0.419753 8.94736 0.595858 8.57352 0.878691 8.2883L8.75377 0.413217C9.43263 -0.160306 10.4336 -0.133966 11.0813 0.474468ZM8.15877 3.4495L10.5038 5.79452L12.2538 4.08826L9.86504 1.69948L8.15877 3.4495Z"
                                    fill="#5357B6" />
                            </svg>

                            <div class="font-rubik text-moderate-blue font-medium">Edit</div>
                        </div>


                    </div>



                </div>

                <div v-if="isEditing"
                    class="w-full  md:w-auto md:px-0 justify-center pt-[24px] md:py-[24px] flex flex-col h-[80%] md:h-full flex-grow">

                    <textarea style="border-width: 1px; resize: none; height: auto;"
                        class="w-full min-h-[96px] h-auto rounded-[8px] border-moderate-blue outline-0 pt-[12px] px-[24px] flex-grow"
                        name="" id=""
                        v-model="updatedContent"
                        ></textarea>


                </div>
                <div v-else class="mt-[15px]">
                    <FormattedContent :content="post.content" />
                </div>

                <div
                v-if="isEditing" 
                class="w-full flex justify-end items-center mt-[15px] md:mt-0">
                    <button 
                    type="submit"
                    class="w-[104px] h-[48px] rounded-[8px] bg-moderate-blue text-white font-rubik font-medium">
                        UPDATE
                    </button>

                </div>

            </form>



            <div class="w-full h-[20%] flex md:hidden justify-between items-center p-5">
                <div class="bg-light-gray w-[100px] h-[40px] flex justify-evenly items-center rounded-[10px]">
                    <p class="font-rubik text-light-grayish-blue font-medium">+</p>
                    <p class="font-rubik text-moderate-blue font-medium">{{ post.upvotes }}</p>
                    <p class="font-rubik text-light-grayish-blue font-medium">-</p>
                </div>

                <div class="items-center  gap-[23.86px] flex">
                    <div 
                    
                    @click="toggleModal" class="cursor-pointer items-center gap-[3px] flex">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.64458 1.16667H11.5261V2.33333H0V1.16667H2.88153L3.84633 0H7.67981L8.64458 1.16667ZM2.68944 14C1.8441 14 1.15261 13.3017 1.15261 12.4479V3.5H10.3735V12.4479C10.3735 13.3017 9.682 14 8.8367 14H2.68944Z"
                                fill="#ED6368" />
                        </svg>

                        <p class="font-rubik text-soft-red font-medium">Delete</p>
                    </div>

                    <div @click="toggleEdit()" class="cursor-pointer items-center gap-[3px] flex">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.0813 0.474468L13.4788 2.87199C14.1491 3.51055 14.1765 4.57097 13.5401 5.24327L5.66499 13.1184C5.37977 13.4012 5.00593 13.5773 4.60623 13.6171L0.957442 13.9496H0.878691C0.646111 13.951 0.422565 13.8596 0.257434 13.6959C0.0728398 13.5119 -0.0201832 13.2553 0.00368177 12.9959L0.379936 9.34706C0.419753 8.94736 0.595858 8.57352 0.878691 8.2883L8.75377 0.413217C9.43263 -0.160306 10.4336 -0.133966 11.0813 0.474468ZM8.15877 3.4495L10.5038 5.79452L12.2538 4.08826L9.86504 1.69948L8.15877 3.4495Z"
                                fill="#5357B6" />
                        </svg>

                        <p class="font-rubik text-moderate-blue font-medium">Edit</p>
                    </div>


                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { router, usePage } from '@inertiajs/vue3'
import { useToast } from 'vue-toastification'
import Modal from './Modal.vue';
import FormattedContent from './FormattedContent.vue';
export default {
    name: 'UserPost',
    components: {
        Modal,
        FormattedContent,
    },

    data() {
        return {
            isEditing: false,
            profile_photo_url: this.post.user.profile_picture_path
          ? `/storage/${this.post.user.profile_picture_path}`
          : '/images/avatars/default.jpg',
          isDeleting: false,
          updatedContent: this.post.content,

          form: {
            content: '',
        },
        }
    },

    setup() {
        const toast = useToast()
        const { props } = usePage()
        const flash = props.flash




        if (flash && flash.success) {
            toast.success(flash.success)
        }

        if (flash && flash.fail) {
            toast.error(flash.fail)
        }

        return {
            toast,
            flash
        }
    },

    props: {
        post: {
            type: Object,
            required: true
        },
    },

    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing;

        },

        toggleModal() {
            this.isDeleting = !this.isDeleting
        },

        submit() {
            router.post('/update', {
                post_id: this.post.id,
                content: this.updatedContent
            }, {
                onError: (err) => {
                    console.log(err); // Log the error to see its structure
                    Object.keys(err).forEach(key => {
                        this.errors[key] = err[key];
                    });
                    this.toast.error('Update failed. Please check the form for errors.');
                },
                onSuccess: () => {
                    console.log('success');
                    this.isEditing = false;
                    this.toast.success('Update successful');
                    location.reload();
                }
            });
        }
    },
};
</script>