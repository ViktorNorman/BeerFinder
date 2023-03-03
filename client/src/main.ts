import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import "./style.css";
import App from "./App.vue";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
}).mount("#app");
