import {
  GET_DOCUMENTATION,
  GET_DOCUMENTATION_LIST,
} from "@/graphql/query/documentation.query";
import { IDocumentation } from "@/interfaces/IDocumentation";
import { downloadFile } from "@/utils/file.utils";
import { useLazyQuery } from "@apollo/client";

export const DocumentationService = () => {
  const [fetchDocumentation] = useLazyQuery<{
    getDocumentationList: IDocumentation[];
  }>(GET_DOCUMENTATION_LIST);
  const [getDocument] = useLazyQuery<{
    getDocumentation: IDocumentation & { file: string };
  }>(GET_DOCUMENTATION);

  const getDocumentationList = async (
    patient_id: number
  ): Promise<IDocumentation[]> => {
    const data = await fetchDocumentation({
      variables: {
        filter: {
          patient_id: [patient_id],
        },
        orderBy: {
          field: "its",
          direction: "desc",
        },
      },
    });

    return data.data?.getDocumentationList || [];
  };

  const getDocumentation = async (documentId: number) => {
    const thisDocumentResponse = await getDocument({
      variables: {
        id: documentId,
      },
    });

    if (thisDocumentResponse.data) {
      const thisDocument = thisDocumentResponse.data.getDocumentation;

      downloadFile(
        thisDocument.file,
        thisDocument.filename,
        thisDocument.mimetype
      );
    } else {
      console.log(thisDocumentResponse);
      throw new Error(
        "Ha ocurrido un error al descargar el archivo, por favor intente nuevamente más tarde"
      );
    }
  };

  return {
    getDocumentationList,
    getDocumentation,
  };
};
