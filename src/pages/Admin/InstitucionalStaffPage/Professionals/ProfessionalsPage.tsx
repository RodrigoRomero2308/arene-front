import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import StaffElementPage from "../Common/StaffElementPage";

const ProfessionalPage = ({
  staff,
  staffLoading,
  handleSearchFormSubmit,
  onReload,
}: {
  staff: IProfessional[];
  staffLoading: boolean;
  handleSearchFormSubmit: (values: IProfessionalFilter) => void;
  onReload: () => void;
}) => {
  return (
    <StaffElementPage
      handleSearchFormSubmit={handleSearchFormSubmit}
      staff={staff}
      staffLoading={staffLoading}
      staffName="Profesionales"
      onReload={onReload}
    />
  );
};

export default ProfessionalPage;
