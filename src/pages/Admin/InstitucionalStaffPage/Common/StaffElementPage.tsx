import { IProfessional } from "@/interfaces/IProfessional";
import { Space, Title } from "@mantine/core";
import {
  ProfessionalStaffSearch,
  PhysiatristStaffSearch,
  NoMedicalStaffSearch,
} from "./StaffSearch";
import {
  ProfessionalsTable,
  PhysiatristsTable,
  NoMedicalsTable,
} from "./StaffTables";

type Props = {
  staff: IProfessional[];
  staffLoading: boolean;
  handleSearchFormSubmit: any;
  onReload: () => void;
  staffName:
    | "Administradores"
    | "Coordinadores"
    | "Directores"
    | "Fisiatras"
    | "Profesionales";
};

const StaffElementPage = ({
  handleSearchFormSubmit,
  staff,
  staffName,
  staffLoading,
  onReload,
}: Props) => {
  return (
    <>
      <Title order={2}>{staffName}</Title>
      <Space h="md" />
      {staffName == "Profesionales" ? (
        <ProfessionalStaffSearch
          handleSearchFormSubmit={handleSearchFormSubmit}
          tableLoading={staffLoading}
          staffPathName="professionals"
          staffName={staffName}
        />
      ) : staffName == "Fisiatras" ? (
        <PhysiatristStaffSearch
          handleSearchFormSubmit={handleSearchFormSubmit}
          tableLoading={staffLoading}
          staffPathName="physiatrists"
          staffName={staffName}
        />
      ) : staffName == "Administradores" ? (
        <NoMedicalStaffSearch
          handleSearchFormSubmit={handleSearchFormSubmit}
          tableLoading={staffLoading}
          staffPathName="administrators"
          staffName={staffName}
        />
      ) : staffName == "Coordinadores" ? (
        <NoMedicalStaffSearch
          handleSearchFormSubmit={handleSearchFormSubmit}
          tableLoading={staffLoading}
          staffPathName="coordinators"
          staffName={staffName}
        />
      ) : staffName == "Directores" ? (
        <NoMedicalStaffSearch
          handleSearchFormSubmit={handleSearchFormSubmit}
          tableLoading={staffLoading}
          staffPathName="directors"
          staffName={staffName}
        />
      ) : (
        <></>
      )}
      <Space h="md" />
      {staffName == "Profesionales" ? (
        <ProfessionalsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="professionals"
          onReload={onReload}
        />
      ) : staffName == "Fisiatras" ? (
        <PhysiatristsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="physiatrists"
          onReload={onReload}
        />
      ) : staffName == "Administradores" ? (
        <NoMedicalsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="administrators"
          onReload={onReload}
        />
      ) : staffName == "Coordinadores" ? (
        <NoMedicalsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="coordinators"
          onReload={onReload}
        />
      ) : staffName == "Directores" ? (
        <NoMedicalsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="directors"
          onReload={onReload}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default StaffElementPage;
