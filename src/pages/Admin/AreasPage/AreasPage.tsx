import { DELETE_AREA } from "@/graphql/mutation/area.mutation";
import { GET_AREAS } from "@/graphql/query/area.query";
import { IArea } from "@/interfaces/IArea";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Group,
  LoadingOverlay,
  Menu,
  Modal,
  Space,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  DotsVertical,
  Edit,
  Plus,
  Trash,
} from "tabler-icons-react";
import { AreaAdminModal } from "./AreaAdminModal";

const AreasPage = () => {
  const [getAreas] = useLazyQuery(GET_AREAS);
  const [deleteArea] = useMutation(DELETE_AREA);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [areaToDelete, setAreaToDelete] = useState<IArea | undefined>();
  const [areasLoading, setAreasLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [areaToUpdate, setAreaToUpdate] = useState<IArea | undefined>();

  const getAreasFromServer = () => {
    setAreasLoading(true);
    getAreas()
      .then((result) => {
        setAreas(
          result.data.getAreas.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAreasLoading(false);
      });
  };

  useEffect(() => {
    getAreasFromServer();
  }, []);

  const closeAreaAdminModal = () => {
    setCreateModalVisible(false);
    setAreaToUpdate(undefined);
  };

  return (
    <>
      <Title order={2}>Áreas</Title>
      <Space h="md" />
      <Button onClick={() => setCreateModalVisible(true)} rightIcon={<Plus />}>
        Nuevo
      </Button>
      <Space h="md" />
      <div style={{ position: "relative" }}>
        <Table striped>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {areas.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
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
                          setAreaToUpdate(item);
                        }}
                        icon={<Edit />}
                      >
                        Modificar área
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => setAreaToDelete(item)}
                        icon={<Trash />}
                      >
                        Eliminar área
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <LoadingOverlay visible={areasLoading} />
      </div>
      {/* Create and update modal */}
      <AreaAdminModal
        visible={createModalVisible || !!areaToUpdate}
        onClose={() => closeAreaAdminModal()}
        afterCreate={() => {
          closeAreaAdminModal();
          getAreasFromServer();
        }}
        initialValues={areaToUpdate}
      />
      {/* Delete modal */}
      <Modal
        title={
          <Group>
            <AlertCircle />
            <Text>Eliminar área</Text>
          </Group>
        }
        opened={!!areaToDelete}
        onClose={() => setAreaToDelete(undefined)}
      >
        <Text>
          ¿Estás seguro que desesas eliminar el área {areaToDelete?.name}?
        </Text>
        <Space h="lg" />
        <Button
          color="red"
          onClick={() => {
            deleteArea({
              variables: {
                id: areaToDelete?.id,
              },
            }).then(() => {
              setAreaToDelete(undefined);
              getAreasFromServer();
            });
          }}
        >
          Eliminar
        </Button>
      </Modal>
    </>
  );
};

export default AreasPage;
