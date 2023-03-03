import { reactive } from "vue";
import { SearchOptions } from "../../models/searchOptions";

const defaultSearchOptions: SearchOptions = {
  searchTerm: "",
  paginationSize: 10,
  page: 1,
};

export const $searchOptions = reactive({
  state: defaultSearchOptions,
  setState(args: Partial<SearchOptions>) {
    this.state = { ...this.state, ...args };
  },
});
