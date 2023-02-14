import { WithPermission } from "@/components/WithPermission/WithPermission";
import { areaRelations } from "@/constants/areaRelations";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { DELETE_AREA } from "@/graphql/mutation/area.mutation";
import {
  GET_AREAS,
  GET_AREA_ACTIVE_RELATIONS,
} from "@/graphql/query/area.query";
import { IArea } from "@/interfaces/IArea";
import { toastOptions } from "@/shared/toastOptions";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { userHasPermission } from "@/utils/permission.utils";
import { getStringsFormatted } from "@/utils/string.utils";
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
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  const [getAreasActiveRelations] = useLazyQuery<{
    getAreaActiveRelations: string[];
  }>(GET_AREA_ACTIVE_RELATIONS);
  const [deleteArea] = useMutation(DELETE_AREA);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [areaToDelete, setAreaToDelete] = useState<IArea | undefined>();
  const [relationsOfAreaToDelete, setRelationsOfAreaToDelete] = useState<
    string[]
  >([]);
  const [areasLoading, setAreasLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [areaToUpdate, setAreaToUpdate] = useState<IArea | undefined>();
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);

  const { user } = useContext(userContext);

  const getAreasFromServer = () => {
    setAreasLoading(true);
    getAreas()
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        setAreas(
          result.data.getAreas.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((error: any) => {
        toast.error(
          parseGraphqlErrorMessage(error) || error.message,
          toastOptions
        );
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

  const handleAreaDelete = async (area: IArea) => {
    setAreasLoading(true);
    try {
      /* Llamamos servicio nuevo */
      const result = await getAreasActiveRelations({
        variables: {
          id: area.id,
        },
      });

      if (result.error) {
        throw result.error;
      }

      if (!result.data) {
        throw new Error(
          "No se pudo recuperar la información del area a eliminar"
        );
      }

      const relationLabels: string[] = [];

      result.data.getAreaActiveRelations.map((item) => {
        const label = areaRelations.find(
          (relation) => relation.code === item
        )?.label;

        if (label) relationLabels.push(label);
      });

      setRelationsOfAreaToDelete(relationLabels);
      setAreaToDelete(area);
    } catch (error: any) {
      toast.error(
        parseGraphqlErrorMessage(error) || error.message,
        toastOptions
      );
    } finally {
      setAreasLoading(false);
    }
  };

  return (
    <>
      <Title order={2}>Áreas</Title>
      <WithPermission permissionRequired={PermissionCodes.AreaCreate}>
        <>
          <Space h="md" />
          <Button
            onClick={() => setCreateModalVisible(true)}
            rightIcon={<Plus />}
          >
            Nuevo
          </Button>
        </>
      </WithPermission>
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
                        disabled={
                          !userHasPermission(user, PermissionCodes.AreaUpdate)
                        }
                      >
                        Modificar área
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          handleAreaDelete(item);
                        }}
                        icon={<Trash />}
                        disabled={
                          !userHasPermission(user, PermissionCodes.AreaDelete)
                        }
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
        {relationsOfAreaToDelete.length ? (
          <>
            <Space h="xs" />
            <Text color="red">
              El area tiene {getStringsFormatted(relationsOfAreaToDelete)}{" "}
              activos.
            </Text>
          </>
        ) : null}
        <Space h="lg" />
        <div
          style={{
            display: "flex",
            gap: "4px",
          }}
        >
          <Button
            color="red"
            loading={deleteModalButtonLoading}
            onClick={() => {
              setDeleteModalButtonLoading(true);
              deleteArea({
                variables: {
                  id: areaToDelete?.id,
                },
              })
                .then(() => {
                  setAreaToDelete(undefined);
                  getAreasFromServer();
                  toast.success("Area eliminada exitosamente", toastOptions);
                })
                .finally(() => {
                  setDeleteModalButtonLoading(false);
                });
            }}
          >
            Eliminar
          </Button>
          <Button
            onClick={() => {
              setAreaToDelete(undefined);
            }}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AreasPage;
