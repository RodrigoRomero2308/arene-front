import { PermissionCodes } from "@/enums/permissions";
import { ReactNode } from "react";
import {
  AdjustmentsAlt,
  Heartbeat,
  Calendar, Home,
  UserCircle,
} from "tabler-icons-react";

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
    icon: <Heartbeat />,
    label: "Pacientes",
    permissionRequired: PermissionCodes.PatientRead,
    route: "/patients",
    iconColor: "green",
  },
  {
    icon: <AdjustmentsAlt />,
    label: "Áreas",
    permissionRequired: PermissionCodes.AdminArea,
    route: "/admin/area",
    iconColor: "red",
  },
  {
    icon: <Calendar />,
    label: "Administración de turnos",
    permissionRequired: PermissionCodes.AdminArea,
    route: "/admin/turnos",
    iconColor: "pink",
  },
];
