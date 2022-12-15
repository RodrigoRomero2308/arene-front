import { IDocumentation } from "@/interfaces/IDocumentation";
import { Menu, Table, UnstyledButton } from "@mantine/core";
import { DotsVertical, Download } from "tabler-icons-react";

const DocumentationList = ({
  documentationList,
  downloadDocument,
}: {
  documentationList: IDocumentation[];
  downloadDocument: (documentId: number) => void;
}) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Nombre del archivo</th>
          <th>Tipo de documentación</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {documentationList.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.filename}</td>
              <td>
                {item.documentationType?.name ||
                  item.other_documentation_type ||
                  ""}
              </td>
              <td>
                <Menu shadow="sm">
                  <Menu.Target>
                    <UnstyledButton>
                      <DotsVertical />
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        downloadDocument(item.id);
                      }}
                      icon={<Download />}
                    >
                      Descargar archivo
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DocumentationList;
