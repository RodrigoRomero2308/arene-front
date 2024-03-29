import { PermissionCodes } from "@/enums/permissions";
import { ReactNode } from "react";
import {
  BuildingCommunity,
  Heartbeat,
  Calendar,
  Home,
  Location,
  Award,
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
  // TODO: por desarrollar
  // {
  //   icon: <UserCircle />,
  //   label: "Ver perfil",
  //   route: "/profile",
  //   iconColor: "blue",
  // },
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
    icon: <Location />,
    label: "Áreas",
    permissionRequired: PermissionCodes.AdminArea,
    route: "/admin/area",
    iconColor: "red",
  },
  {
    icon: <Award />,
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
