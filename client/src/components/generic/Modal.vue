<script setup lang="ts">
defineEmits(["toggleModal"]);
</script>

<template>
    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-6xl">
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-50 outline-none focus:outline-none">
                <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <slot name="title"></slot>
                </div>
                <div class="relative p-6 flex-auto">
                    <slot name="content"></slot>
                </div>
                <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button type="button" v-on:click="$emit('toggleModal')" class="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" >
                        Close
                    </button>
                </div>
            </div>
        </div>  
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>