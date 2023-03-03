import { gql } from "apollo-server-express";

const Schema = gql`
  type Beer {
    id: Int
    name: String
    image_url: String
    description: String
    food_pairing: [String]
  }
  type Query {
    getBeers(searchTerm: String, paginationSize: Int, page: Int): [Beer]
    getBeer(id: Int): [Beer]
  }
`;

export default Schema;
