<script setup lang="ts">
import BeerTable from './components/BeerTable.vue';
import DisplayState from './components/generic/DisplayState.vue';
import Pagination from './components/Pagination.vue';
import SearchInput from './components/SearchInput.vue';

import { useQuery } from '@vue/apollo-composable';
import { GET_BEERS } from './graphql/queries';
import { $searchOptions } from './shared/state/searchOptions';

const { result, loading, error, refetch } = useQuery(GET_BEERS, $searchOptions.state);

const search = (searchTerm: string) => {
  $searchOptions.setState({searchTerm, page:1});
  refetch($searchOptions.state);
}

const changePage = (page: number) => {
  $searchOptions.setState({page});
  refetch($searchOptions.state);
}

</script>

<template>
  <SearchInput @search="search"/>
  <Pagination @change-page="changePage" :numberOfPageItems="result?.getBeers?.length"/>
  <DisplayState :loading="loading" :result="result" :error="error">
    <template #result>
      <BeerTable :beers="result.getBeers"/>
    </template>
  </DisplayState>
 
</template>
