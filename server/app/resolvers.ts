import { UserInputError } from "apollo-server-core";
import {
  buildBeerNameParam,
  buildPaginationParams,
  mapBeerData,
} from "./application/beer";
import { NotFoundError } from "./constants/notFoundError";
import { punkApiUrl } from "./constants/punkApiUrl";
import { getApiCall } from "./helpers/getApiCall";

const Resolvers = {
  Query: {
    getBeers: async (_: any, args: any) => {
      try {
        const apiCallUrl = `${punkApiUrl}${buildPaginationParams(
          args
        )}${buildBeerNameParam(args)}`;
        const res = await getApiCall(apiCallUrl);

        return mapBeerData(res);
      } catch (err: any) {
        if (err.response.status === 404) {
          throw NotFoundError;
        }
        throw err;
      }
    },
    getBeer: async (_: any, args: any) => {
      try {
        if (!args.id) {
          throw UserInputError;
        }

        const res = await getApiCall(`${punkApiUrl}/${args.id}`);

        return mapBeerData(res);
      } catch (err: any) {
        if (err.response.status === 404) {
          throw NotFoundError;
        }
        throw err;
      }
    },
  },
};

export default Resolvers;
