<script setup lang="ts">
import { useLazyQuery } from '@vue/apollo-composable';
import { reactive } from 'vue';
import { GET_BEER } from '../graphql/queries';
import Modal from './generic/Modal.vue';

withDefaults(
  defineProps<{
    beers: any;
  }>(),
  {},
);

const { result, error, load} = useLazyQuery(GET_BEER);

const state = reactive({ showModal: false, toggleModal(){
    this.showModal = !this.showModal;
} })


const getBeerDetails = (id: number) => {
  load(GET_BEER,{id});
  toggleModal();
}

const toggleModal = () =>{
  state.toggleModal()
}

</script>

<template>
  <div  class="container mx-auto space-y-2 lg:space-y-0 lg:gap-4 lg:grid lg:grid-cols-3 pb-8" >
    <div @click="() => getBeerDetails(beer.id)" class="container flex flex-col bg-slate-50 rounded shadow-md cursor-pointer p-4 hover:scale-105 transition-all duration-500" v-for="beer of beers" :key="beer.id">
      <div class="place-self-center pb-4 text-lg">{{ beer.name }}</div>
      <img class="place-self-center object-scale-down h-60 w-60" :src=beer.image_url>
    </div>
  </div>
  
  <div v-if="beers && beers.length === 0" class="text-center pb-4 text-lg" >
    Nothing found from search
  </div>

  <Modal v-if="state.showModal" @toggle-modal="toggleModal">
    <template #title v-if="result && result.getBeer[0]">
      <div class="text-lg">
        {{ result.getBeer[0].name }}
      </div>
    </template>
    <template #content v-if="result && result.getBeer[0]">
      <div>
        {{ result.getBeer[0].description }}
      </div>
      <br>
      <div class="font-semibold">
        This beer pairs well with:
      </div>
      <div v-for="pairing of result.getBeer[0]?.food_pairing" :key="pairing">
        {{ pairing }}
      </div>
    </template>

    <template #title v-if="error">
      <div>
        Oops... Something went wrong!
      </div>
    </template>
    <template #content v-if="error">
      <div>
        {{ error?.message }}
      </div>
    </template>
  </Modal>
  
</template>
