import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_ROLES,
  GET_ROLES_BY_USER_ID,
  GET_ROLE_BY_ROLE_NAME,
} from "@/graphql/query/role.query";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  NativeSelect,
  SelectItem,
  Space,
  Table,
  UnstyledButton,
} from "@mantine/core";
import { CREATE_ROLEUSER } from "@/graphql/mutation/roleUser.mutation";
import { IProfessional } from "@/interfaces/IProfessional";
import { IRole } from "@/interfaces/IRole";
import { CircleX } from "tabler-icons-react";
import { IRoleUser } from "@/interfaces/IRoleUser";

export const AssignRoleModal = ({
  visible,
  onClose,
  afterCreate,
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
  const [rolesById, setRolesById] = useState<IRole[]>([]);
  const [getRolesNameByUserId] = useLazyQuery(GET_ROLES_BY_USER_ID);
  const [getRoles] = useLazyQuery(GET_ROLES);
  const [rolesOptions, setRolesOptions] = useState<SelectItem[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const getRoleFromServer = () => {
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
    getRoleFromServer();
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
    <Modal title="Asignar Role" opened={visible || false} onClose={onClose}>
      <Group position="center">
        <NativeSelect
          sx={{ width: 275 }}
          data={rolesOptions.filter(
            (item) => !rolesById.find((role) => role.id === Number(item.value))
          )}
          label="Roles"
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
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rolesById.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <UnstyledButton>
                  <CircleX />
                </UnstyledButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <LoadingOverlay visible={rolesLoading} />
      <Space h="lg"></Space>
    </Modal>
  );
};
