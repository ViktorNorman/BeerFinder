import { GraphQLError } from "graphql";

export const NotFoundError = new GraphQLError(
  "Oops... The data you are trying to receive does not exist.",
  {
    extensions: {
      code: "NOT_FOUND",
    },
  }
);
