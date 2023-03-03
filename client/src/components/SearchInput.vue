<script setup lang="ts">
import { ref } from "vue";
let searchTerm = ref("");
</script>

<template>
        <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
            <div class="md:flex">
                <div class="w-full p-3">
                    <div class="relative">
                        <i class="absolute fa fa-search text-gray-400 top-5 left-4"></i>
                        <input v-model="searchTerm" @keydown.enter="$emit('search', searchTerm)" placeholder="Search your beer" class="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer">
                        <span @click="$emit('search', searchTerm)" class="absolute top-4 right-5 border-l pl-4 hover:cursor-pointer hover:scale-105">
                            <span class="material-symbols-outlined text-gray-500 hover:text-green-500 hover:cursor-pointer  select-none">
                            search
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
</template>
