import { PermissionCodes } from "@/enums/permissions";
import { ReactNode } from "react";
import {
  AdjustmentsAlt,
  BuildingCommunity,
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
    icon: <BuildingCommunity />,
    label: "Personal Institucional",
    permissionRequired: PermissionCodes.ProfessionalRead,
    route: "/institucionalStaff",
    iconColor: "violet",
  },
  {
    icon: <AdjustmentsAlt />,
    label: "Áreas",
    permissionRequired: PermissionCodes.AdminArea,
    route: "/admin/area",
    iconColor: "red",
  },
  {
    icon: <AdjustmentsAlt />,
    label: "Roles",
    permissionRequired: PermissionCodes.AdminRole,
    route: "/admin/role",
    iconColor: "green",
  },  
  {
    icon: <Calendar />,
    label: "Turnos",
    permissionRequired: PermissionCodes.Admin,
    route: "/admin/appointments",
    iconColor: "pink",
  },
];
