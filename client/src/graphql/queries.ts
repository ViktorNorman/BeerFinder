import { gql } from "@apollo/client/core";

export const GET_BEERS = gql`
  query ($searchTerm: String, $paginationSize: Int, $page: Int) {
    getBeers(
      searchTerm: $searchTerm
      paginationSize: $paginationSize
      page: $page
    ) {
      id
      name
      image_url
    }
  }
`;

export const GET_BEER = gql`
  query ($id: Int) {
    getBeer(id: $id) {
      id
      name
      description
      food_pairing
    }
  }
`;
