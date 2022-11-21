import { Menu, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Affiliate, DotsVertical, Edit } from "tabler-icons-react";
import { PermissionCodes } from "@/enums/permissions";
import { userHasPermission } from "@/utils/permission.utils";
import { useContext, useEffect, useState } from "react";
import userContext from "@/context/UserContext/UserContext";
import { IProfessional } from "@/interfaces/IProfessional";
import { AssignRoleModal } from "./StaffModals";

type Props = {
  pathName: string;
  item: IProfessional;
};

export const StaffMenuDropDown = ({ pathName, item }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [openModal, setOpenModal] = useState(false);
  const [userToAssignRole, setUserToAssignRole] = useState<
    IProfessional | undefined
  >();

  const closeRoleUserAdminModal = () => {
    setUserToAssignRole(undefined);
    setOpenModal(false);
  };

  return (
    <>
      <Menu shadow="sm" position="left-start">
        <Menu.Target>
          <UnstyledButton>
            <DotsVertical />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              navigate(
                `/app/institucionalStaff/${pathName}/edit/${item.user_id}`
              );
            }}
            icon={<Edit />}
            disabled={
              !userHasPermission(user, PermissionCodes.ProfessionalUpdate)
            }
          >
            Modificar
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setUserToAssignRole(item);
            }}
            icon={<Affiliate />}
            disabled={!userHasPermission(user, PermissionCodes.RoleUserCreate)}
          >
            Asignar Rol
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <AssignRoleModal
        afterCreate={() => {
          closeRoleUserAdminModal();
        }}
        onClose={() => closeRoleUserAdminModal()}
        initialData={userToAssignRole}
        visible={openModal || !!userToAssignRole}
      />
    </>
  );
};
