import { isApolloError } from "@apollo/client";

export const parseGraphqlErrorMessage = (error: any): string | undefined => {
  if (!isApolloError(error)) {
    return undefined;
  }

  if (error.message === "Failed to fetch") {
    return "No se ha podido establecer comunicación con el servidor. Intente mas tarde o pongase en contacto con el administrador del sistema";
  }

  let message = "";

  const anyOfErrorsIsDatabaseError = error.graphQLErrors.some(
    (graphqlError) => {
      if ((graphqlError.extensions as any)?.exception?.clientVersion) {
        /* Error de prisma */
        return true;
      }
    }
  );

  if (anyOfErrorsIsDatabaseError)
    return "Error interno, por favor comuniquese con un administrador del sistema";

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
