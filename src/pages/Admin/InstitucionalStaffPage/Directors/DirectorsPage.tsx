import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import StaffElementPage from "../Common/StaffElementPage";
const DirectorsPage = ({
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
      staffName="Directores"
      onReload={onReload}
    />
  );
};

export default DirectorsPage;
