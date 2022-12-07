import { isApolloError } from "@apollo/client";

export const parseGraphqlErrorMessage = (error: any): string | undefined => {
  if (!isApolloError(error)) {
    return undefined;
  }

  let message = "";

  for (const graphqlError of error.graphQLErrors) {
    if (graphqlError.extensions.code) {
      let messageToAdd;
      if (Array.isArray((graphqlError.extensions as any)?.response?.message)) {
        messageToAdd = (
          (graphqlError.extensions as any)?.response?.message as string[]
        ).join(", ");
      } else if (
        typeof (graphqlError.extensions as any)?.response?.message === "string"
      ) {
        messageToAdd = (graphqlError.extensions as any)?.response?.message;
      }

      if (!message) {
        message = messageToAdd;
      } else {
        message = `${message}. ${messageToAdd}`;
      }
    }
  }

  return message;
};
