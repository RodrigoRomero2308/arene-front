import { WithPermission } from "@/components/WithPermission/WithPermission";
import { roleRelations } from "@/constants/roleRelations";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { DELETE_ROLE } from "@/graphql/mutation/role.mutation";
import {
  GET_ROLES,
  GET_ROLE_ACTIVE_RELATIONS,
} from "@/graphql/query/role.query";
import { IRole, IRoleFilter } from "@/interfaces/IRole";
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
import { RoleAdminModal } from "./RoleAdminModal";

const RolesPage = () => {
  const [getRoles] = useLazyQuery(GET_ROLES);
  const [getRolesActiveRelations] = useLazyQuery<{
    getRoleActiveRelations: string[];
  }>(GET_ROLE_ACTIVE_RELATIONS);
  const [deleteRole] = useMutation(DELETE_ROLE);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [roleToDelete, setRoleToDelete] = useState<IRole | undefined>();
  const [relationsOfRoleToDelete, setRelationsOfRoleToDelete] = useState<
    string[]
  >([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [roleToUpdate, setRoleToUpdate] = useState<IRole | undefined>();
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);

  const { user } = useContext(userContext);

  const getRolesFromServer = (variables?: { filter: IRoleFilter }) => {
    setRolesLoading(true);
    getRoles({
      variables,
    })
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        setRoles(
          result.data.getRoles.map((item: any) => {
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
        setRolesLoading(false);
      });
  };

  useEffect(() => {
    getRolesFromServer();
  }, []);

  const closeRoleAdminModal = () => {
    setCreateModalVisible(false);
    setRoleToUpdate(undefined);
  };

  const handleRoleDelete = async (role: IRole) => {
    setRolesLoading(true);
    try {
      /* Llamamos servicio nuevo */
      const result = await getRolesActiveRelations({
        variables: {
          id: role.id,
        },
      });

      if (result.error) {
        throw result.error;
      }

      if (!result.data) {
        throw new Error(
          "No se pudo recuperar la información del rol a eliminar"
        );
      }

      const relationLabels: string[] = [];

      result.data.getRoleActiveRelations.map((item) => {
        const label = roleRelations.find(
          (relation) => relation.code === item
        )?.label;

        if (label) relationLabels.push(label);
      });

      setRelationsOfRoleToDelete(relationLabels);
      setRoleToDelete(role);
    } catch (error: any) {
      toast.error(
        parseGraphqlErrorMessage(error) || error.message,
        toastOptions
      );
    } finally {
      setRolesLoading(false);
    }
  };

  return (
    <>
      <Title order={2}>Roles</Title>
      {/* TODO: por desarrollar */}
      {import.meta.env.DEV ? (
        <WithPermission permissionRequired={PermissionCodes.RoleCreate}>
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
      ) : null}
      <Space h="md" />
      <div style={{ position: "relative" }}>
        <Table striped>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              {/* TODO: por desarrollar */}
              {import.meta.env.DEV ? <th></th> : null}
            </tr>
          </thead>

          <tbody>
            {roles.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                {/* TODO: por desarrollar */}
                {import.meta.env.DEV ? (
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
                            setRoleToUpdate(item);
                          }}
                          icon={<Edit />}
                          disabled={
                            !userHasPermission(user, PermissionCodes.RoleUpdate)
                          }
                        >
                          Modificar rol
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => handleRoleDelete(item)}
                          icon={<Trash />}
                          disabled={
                            !userHasPermission(user, PermissionCodes.RoleDelete)
                          }
                        >
                          Eliminar rol
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </Table>
        <LoadingOverlay visible={rolesLoading} />
      </div>
      {/* Create and update modal */}
      <RoleAdminModal
        visible={createModalVisible || !!roleToUpdate}
        onClose={() => closeRoleAdminModal()}
        afterCreate={() => {
          closeRoleAdminModal();
          getRolesFromServer();
        }}
        initialValues={roleToUpdate}
      />
      {/* Delete modal */}
      <Modal
        title={
          <Group>
            <AlertCircle />
            <Text>Eliminar rol</Text>
          </Group>
        }
        opened={!!roleToDelete}
        onClose={() => setRoleToDelete(undefined)}
      >
        <Text>
          ¿Estás seguro que deseas eliminar el rol {roleToDelete?.name}?
        </Text>
        {relationsOfRoleToDelete.length ? (
          <>
            <Space h="xs" />
            <Text color="red">
              El rol tiene {getStringsFormatted(relationsOfRoleToDelete)}{" "}
              activos.
            </Text>
          </>
        ) : null}
        <Space h="lg" />
        <Button
          color="red"
          loading={deleteModalButtonLoading}
          onClick={() => {
            setDeleteModalButtonLoading(true);
            deleteRole({
              variables: {
                id: roleToDelete?.id,
              },
            })
              .then(() => {
                setRoleToDelete(undefined);
                getRolesFromServer();
              })
              .finally(() => {
                setDeleteModalButtonLoading(false);
              });
          }}
        >
          Eliminar
        </Button>
      </Modal>
    </>
  );
};

export default RolesPage;
