import { Menu, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  Affiliate,
  Award,
  DotsVertical,
  Edit,
  Location,
} from "tabler-icons-react";
import { PermissionCodes } from "@/enums/permissions";
import { userHasPermission } from "@/utils/permission.utils";
import { useContext, useEffect, useState } from "react";
import userContext from "@/context/UserContext/UserContext";
import { IProfessional } from "@/interfaces/IProfessional";
import { AssignAreaModal, AssignRoleModal } from "./StaffModals";

type Props = {
  pathName: string;
  item: IProfessional;
  onReload: () => void;
};

export const StaffMenuDropDown = ({ pathName, item, onReload }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [openModalRoles, setOpenModalRoles] = useState(false);
  const [openModalAreas, setOpenModalAreas] = useState(false);
  const [userToAssignRole, setUserToAssignRole] = useState<
    IProfessional | undefined
  >();
  const [professionalToAssignArea, setProfessionalToAssignArea] = useState<
    IProfessional | undefined
  >();

  const closeRoleUserAdminModal = () => {
    setUserToAssignRole(undefined);
    setOpenModalRoles(false);
    onReload();
  };

  const closeAreaProfessionalAdminModal = () => {
    setProfessionalToAssignArea(undefined);
    setOpenModalAreas(false);
    onReload();
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
            icon={<Award />}
            disabled={
              !userHasPermission(user, PermissionCodes.RoleUserCreate) &&
              !userHasPermission(user, PermissionCodes.RoleUserDelete)
            }
          >
            Roles
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setProfessionalToAssignArea(item);
            }}
            icon={<Location />}
            disabled={
              !userHasPermission(
                user,
                PermissionCodes.AreaProfessionalCreate
              ) &&
              !userHasPermission(user, PermissionCodes.AreaProfessionalDelete)
            }
          >
            Areas
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <AssignRoleModal
        afterCreate={() => {
          closeRoleUserAdminModal();
        }}
        onClose={() => {
          closeRoleUserAdminModal();
        }}
        initialData={userToAssignRole}
        visible={openModalRoles || !!userToAssignRole}
      />
      <AssignAreaModal
        afterCreate={() => {
          closeAreaProfessionalAdminModal();
        }}
        onClose={() => {
          closeAreaProfessionalAdminModal();
        }}
        initialData={professionalToAssignArea}
        visible={openModalAreas || !!professionalToAssignArea}
      ></AssignAreaModal>
    </>
  );
};
