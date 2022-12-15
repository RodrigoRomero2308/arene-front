import { IProfessional } from "@/interfaces/IProfessional";
import { StaffMenuDropDown } from "./StaffMenuDropDown";
import { LoadingOverlay, ScrollArea, Table } from "@mantine/core";

type Props = {
  staff: IProfessional[];
  staffLoading: boolean;
  onReload: () => void;
  pathName:
    | "administrators"
    | "coordinators"
    | "directors"
    | "physiatrists"
    | "professionals";
};

export const ProfessionalsTable = ({
  staff,
  staffLoading,
  onReload,
  pathName,
}: Props) => {
  return (
    <div style={{ position: "relative" }}>
      <ScrollArea
        sx={() => ({
          maxWidth: "100vw",
          overflow: "visible",
        })}
      >
        <Table striped>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Profesión</th>
              <th>Especialidad</th>
              <th>Matricula</th>
              <th>Opciones</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((item) => (
              <tr key={item.user_id}>
                <td>{item.user?.dni}</td>
                <td>
                  {item.user
                    ? `${item.user.firstname} ${item.user.lastname}`
                    : ""}
                </td>
                <td>{item.profession}</td>
                <td>{item.speciality}</td>
                <td>{item.medical_license_number}</td>
                <td>
                  <StaffMenuDropDown
                    pathName={pathName}
                    item={item}
                    onReload={onReload}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
      <LoadingOverlay visible={staffLoading} />
    </div>
  );
};

export const PhysiatristsTable = ({
  staff,
  staffLoading,
  onReload,
  pathName,
}: Props) => {
  return (
    <div style={{ position: "relative" }}>
      <ScrollArea
        sx={() => ({
          maxWidth: "100vw",
          overflow: "visible",
        })}
      >
        <Table striped>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Matricula</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Opciones</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((item) => (
              <tr key={item.user_id}>
                <td>{item.user?.dni}</td>
                <td>
                  {item.user
                    ? `${item.user.firstname} ${item.user.lastname}`
                    : ""}
                </td>
                <td>{item.medical_license_number}</td>
                <td>{item.user?.email}</td>
                <td>{item.user?.phone_number}</td>
                <td>
                  <StaffMenuDropDown
                    pathName={pathName}
                    item={item}
                    onReload={onReload}
                  ></StaffMenuDropDown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
      <LoadingOverlay visible={staffLoading} />
    </div>
  );
};

export const NoMedicalsTable = ({
  staff,
  staffLoading,
  onReload,
  pathName,
}: Props) => {
  return (
    <div style={{ position: "relative" }}>
      <ScrollArea
        sx={() => ({
          maxWidth: "100vw",
          overflow: "visible",
        })}
      >
        <Table striped>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Mail</th>
              <th>Numero de teléfono</th>
              <th>Opciones</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((item) => (
              <tr key={item.user_id}>
                <td>{item.user?.dni}</td>
                <td>
                  {item.user
                    ? `${item.user.firstname} ${item.user.lastname}`
                    : ""}
                </td>
                <td>{item.user?.email}</td>
                <td>{item.user?.phone_number}</td>
                <td>
                  <StaffMenuDropDown
                    pathName={pathName}
                    item={item}
                    onReload={onReload}
                  ></StaffMenuDropDown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
      <LoadingOverlay visible={staffLoading} />
    </div>
  );
};
