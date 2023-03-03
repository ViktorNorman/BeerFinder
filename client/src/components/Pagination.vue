<script setup lang="ts">
import { toRefs } from 'vue';
import {$searchOptions} from '../shared/state/searchOptions';
import {NEGATIVE_INCREMENT_ONE, POSITIVE_INCREMENT_ONE} from '../shared/constants';

const emit = defineEmits<{
  (e: 'changePage', increment: number): void
}>();

const props = defineProps<{
    numberOfPageItems?: number;
 }>();

const { numberOfPageItems } = toRefs(props);

const isUserOnFirstPage = () => {
 return $searchOptions.state.page <= 1;
}

const noItemsInNextPage = () => {
    return (numberOfPageItems?.value ?? 0) < $searchOptions.state.paginationSize;
};

const changePage = (increment: number) => {
    const requestedPage = $searchOptions.state.page + increment;
    const isNextPageRequested = requestedPage > $searchOptions.state.page;
    const isPreviousPageRequested = !isNextPageRequested;

    if(isUserOnFirstPage() && isPreviousPageRequested || isNextPageRequested && noItemsInNextPage()){
        return;
    }

    emit('changePage', requestedPage);
}

</script>

<template>
    <div class="flex justify-between max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl p-4">
        <div @click="() => changePage(NEGATIVE_INCREMENT_ONE)">
            <span class="material-symbols-outlined hover:cursor-pointer select-none hover:scale-105" :disabled="isUserOnFirstPage" v-bind:class="isUserOnFirstPage()?'opacity-25':''">
                arrow_back_ios
            </span>
        </div>  
        <div class="select-none">
            <div>Page</div>
            <div class="text-center">{{$searchOptions.state.page}}</div>
        </div>
        <div @click="() => changePage(POSITIVE_INCREMENT_ONE)" @keydown.right="() => changePage(POSITIVE_INCREMENT_ONE)">
            <span class="material-symbols-outlined hover:cursor-pointer select-none hover:scale-105" :disabled="noItemsInNextPage" v-bind:class="noItemsInNextPage()?'opacity-25':''">
                arrow_forward_ios
            </span>
        </div>
    </div>
</template>
