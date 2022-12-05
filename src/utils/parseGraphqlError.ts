import { isApolloError } from "@apollo/client";

export const parseGraphqlErrorMessage = (error: any): string | undefined => {
  if (!isApolloError(error)) {
    return undefined;
  }

  let message = "";

  for (const graphqlError of error.graphQLErrors) {
    if (
      graphqlError.extensions.code &&
      graphqlError.extensions.code === "BAD_USER_INPUT"
    ) {
      const messageToAdd = (
        (graphqlError.extensions as any)?.response?.message as string[]
      ).join(", ");

      if (!message) {
        message = messageToAdd;
      } else {
        message = `${message}. ${messageToAdd}`;
      }
    }
  }

  return message;
};
