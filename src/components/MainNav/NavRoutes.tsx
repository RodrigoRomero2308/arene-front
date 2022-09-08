import { PermissionCodes } from "@/enums/permissions";
import { ReactNode } from "react";
import { AdjustmentsAlt, Home, UserCircle } from "tabler-icons-react";

export interface INavRoute {
  icon: ReactNode;
  label: string;
  route: string;
  permissionRequired?: PermissionCodes;
  iconColor: string;
}

export const navRoutes: INavRoute[] = [
  {
    icon: <Home />,
    label: "Inicio",
    route: "",
    iconColor: "green",
  },
  {
    icon: <UserCircle />,
    label: "Ver perfil",
    route: "/profile",
    iconColor: "blue",
  },
  {
    icon: <AdjustmentsAlt />,
    label: "Administración de áreas",
    permissionRequired: PermissionCodes.AdminArea,
    route: "/admin/area",
    iconColor: "red",
  },
];
