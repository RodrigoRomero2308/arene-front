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
        />
      ) : staffName == "Fisiatras" ? (
        <PhysiatristsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="physiatrists"
        />
      ) : staffName == "Administradores" ? (
        <NoMedicalsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="administrators"
        />
      ) : staffName == "Coordinadores" ? (
        <NoMedicalsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="coordinators"
        />
      ) : staffName == "Directores" ? (
        <NoMedicalsTable
          staffLoading={staffLoading}
          staff={staff}
          pathName="directors"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default StaffElementPage;
