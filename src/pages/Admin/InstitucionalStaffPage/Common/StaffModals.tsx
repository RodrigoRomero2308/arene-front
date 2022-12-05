import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ROLES, GET_ROLES_BY_USER_ID } from "@/graphql/query/role.query";
import { useEffect, useRef, useState, useContext } from "react";
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  NativeSelect,
  SelectItem,
  Space,
  Table,
  UnstyledButton,
  Text,
  Title,
} from "@mantine/core";
import {
  CREATE_ROLEUSER,
  DELETE_ROLEUSER,
} from "@/graphql/mutation/roleUser.mutation";
import { IProfessional } from "@/interfaces/IProfessional";
import { IRole } from "@/interfaces/IRole";
import { AlertCircle, Trash } from "tabler-icons-react";
import { userHasPermission } from "@/utils/permission.utils";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import {
  CREATE_AREA_PROFESSIONAL,
  DELETE_AREA_PROFESSIONAL,
} from "@/graphql/mutation/areaProfessional.mutation";
import { IArea } from "@/interfaces/IArea";
import {
  GET_AREAS,
  GET_AREAS_BY_PROFESSIONAL_ID,
} from "@/graphql/query/area.query";

export const AssignRoleModal = ({
  visible,
  onClose,
  initialData = {
    user_id: 0,
    medical_license_number: "",
    profession: "",
    speciality: "",
  },
}: {
  visible?: boolean;
  onClose: () => void;
  afterCreate: () => void;
  initialData?: IProfessional;
}) => {
  const [createRoleUser] = useMutation(CREATE_ROLEUSER);
  const [deleteRoleUser] = useMutation(DELETE_ROLEUSER);
  const [rolesById, setRolesById] = useState<IRole[]>([]);
  const [getRolesNameByUserId] = useLazyQuery(GET_ROLES_BY_USER_ID);
  const [getRoles] = useLazyQuery(GET_ROLES);
  const [rolesOptions, setRolesOptions] = useState<SelectItem[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<IRole | undefined>();
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const { user } = useContext(userContext);

  const getAreasFromServer = () => {
    setRolesLoading(true);
    getRoles()
      .then((result) => {
        setRolesOptions(
          result.data.getRoles.map((item: IRole) => {
            return { value: item.id, label: item.name };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRolesLoading(false);
      });
  };

  const getRolesByUserIdFromServer = (userId: number) => {
    try {
      setRolesLoading(true);
      getRolesNameByUserId({
        variables: {
          userId,
        },
      }).then((result) => {
        setRolesById(
          result.data.getRoleUsersByUserId.map((item: any) => {
            delete item.__typename;
            return item.role;
          })
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    getRolesByUserIdFromServer(initialData.user_id);
    getAreasFromServer();
  }, [visible]);

  const executeOperation = () => {
    const role_id = Number(selectRef.current?.value);

    if (Number.isNaN(role_id)) {
      throw new Error("role_id no es un numero");
    }

    let input: any = {
      roleId: role_id,
      userId: initialData.user_id,
    };

    return createRoleUser({
      variables: {
        input: input,
      },
    });
  };

  return (
    <>
      <Modal title="Roles" opened={visible || false} onClose={onClose}>
        <Group position="center">
          <NativeSelect
            sx={{ width: 275 }}
            data={rolesOptions.filter(
              (item) =>
                !rolesById.find((role) => role.id === Number(item.value))
            )}
            label="Asignar Role"
            placeholder="Seleccione un rol"
            ref={selectRef}
          />
          <Button
            sx={{ marginTop: 25 }}
            onClick={() => {
              setLoadingButton(true);
              executeOperation()
                .catch((err) => console.log(err))
                .finally(() => {
                  setLoadingButton(false);
                  getRolesByUserIdFromServer(initialData.user_id);
                });
            }}
            loading={loadingButton}
          >
            Añadir
          </Button>
        </Group>
        <Space h="lg"></Space>
        <Text>Roles asignados</Text>
        <Space h="lg"></Space>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {rolesById.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <UnstyledButton
                    onClick={() => setRoleToDelete(item)}
                    disabled={
                      !userHasPermission(user, PermissionCodes.RoleUserDelete)
                    }
                  >
                    <Trash />
                  </UnstyledButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <LoadingOverlay visible={rolesLoading} />
        <Space h="lg"></Space>
      </Modal>
      <Modal
        title={
          <Group>
            <AlertCircle />
            <Text>Eliminar Role</Text>
          </Group>
        }
        opened={!!roleToDelete}
        onClose={() => setRoleToDelete(undefined)}
      >
        <Text>
          ¿Estás seguro que deseas eliminar el rol {roleToDelete?.name}?
        </Text>
        <Space h="lg" />
        <Button
          color="red"
          loading={deleteModalButtonLoading}
          onClick={() => {
            setDeleteModalButtonLoading(true);
            deleteRoleUser({
              variables: {
                input: {
                  userId: initialData.user_id,
                  roleId: roleToDelete?.id,
                },
              },
            })
              .then(() => {
                setRoleToDelete(undefined);
                getRolesByUserIdFromServer(initialData.user_id);
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

export const AssignAreaModal = ({
  visible,
  onClose,
  initialData = {
    user_id: 0,
    medical_license_number: "",
    profession: "",
    speciality: "",
  },
}: {
  visible?: boolean;
  onClose: () => void;
  afterCreate: () => void;
  initialData?: IProfessional;
}) => {
  const [createAreaProfessional] = useMutation(CREATE_AREA_PROFESSIONAL);
  const [deleteAreaProfessional] = useMutation(DELETE_AREA_PROFESSIONAL);
  const [areasById, setAreasById] = useState<IArea[]>([]);
  const [getAreasNameByProfessionalId] = useLazyQuery(
    GET_AREAS_BY_PROFESSIONAL_ID
  );
  const [getAreas] = useLazyQuery(GET_AREAS);
  const [areasOptions, setAreasOptions] = useState<SelectItem[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);
  const [areasLoading, setAreasLoading] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState<IArea | undefined>();
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const { user } = useContext(userContext);

  const getAreasFromServer = () => {
    setAreasLoading(true);
    getAreas()
      .then((result) => {
        setAreasOptions(
          result.data.getAreas.map((item: IArea) => {
            return { value: item.id, label: item.name };
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

  const getAreasByProfessionalIdFromServer = (userId: number) => {
    try {
      setAreasLoading(true);
      getAreasNameByProfessionalId({
        variables: {
          userId,
        },
      }).then((result) => {
        setAreasById(
          result.data.getAreaProfessionalsByProfessionalId.map((item: any) => {
            delete item.__typename;
            return item.area;
          })
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      setAreasLoading(false);
    }
  };

  useEffect(() => {
    getAreasByProfessionalIdFromServer(initialData.user_id);
    getAreasFromServer();
  }, [visible]);

  const executeOperation = () => {
    const area_id = Number(selectRef.current?.value);

    if (Number.isNaN(area_id)) {
      throw new Error("area_id no es un numero");
    }

    let input: any = {
      professional_id: initialData.user_id,
      area_id: area_id,
    };

    return createAreaProfessional({
      variables: {
        input: input,
      },
    });
  };

  return (
    <>
      <Modal title="Roles" opened={visible || false} onClose={onClose}>
        <Group position="center">
          <NativeSelect
            sx={{ width: 275 }}
            data={areasOptions.filter(
              (item) =>
                !areasById.find((role) => role.id === Number(item.value))
            )}
            label="Asignar Role"
            placeholder="Seleccione un rol"
            ref={selectRef}
          />
          <Button
            sx={{ marginTop: 25 }}
            onClick={() => {
              setLoadingButton(true);
              executeOperation()
                .catch((err) => console.log(err))
                .finally(() => {
                  setLoadingButton(false);
                  getAreasByProfessionalIdFromServer(initialData.user_id);
                });
            }}
            loading={loadingButton}
          >
            Añadir
          </Button>
        </Group>
        <Space h="lg"></Space>
        <Text>Roles asignados</Text>
        <Space h="lg"></Space>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {areasById.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <UnstyledButton
                    onClick={() => setAreaToDelete(item)}
                    disabled={
                      !userHasPermission(user, PermissionCodes.RoleUserDelete)
                    }
                  >
                    <Trash />
                  </UnstyledButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <LoadingOverlay visible={areasLoading} />
        <Space h="lg"></Space>
      </Modal>
      <Modal
        title={
          <Group>
            <AlertCircle />
            <Text>Eliminar Role</Text>
          </Group>
        }
        opened={!!areaToDelete}
        onClose={() => setAreaToDelete(undefined)}
      >
        <Text>
          ¿Estás seguro que deseas eliminar el area {areaToDelete?.name}?
        </Text>
        <Space h="lg" />
        <Button
          color="red"
          loading={deleteModalButtonLoading}
          onClick={() => {
            setDeleteModalButtonLoading(true);
            deleteAreaProfessional({
              variables: {
                input: {
                  area_id: areaToDelete?.id,
                  professional_id: initialData.user_id,
                },
              },
            })
              .then(() => {
                setAreaToDelete(undefined);
                getAreasByProfessionalIdFromServer(initialData.user_id);
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
