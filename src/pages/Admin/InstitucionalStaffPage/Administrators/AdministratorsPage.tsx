import { GET_ADMINISTRATORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import StaffElementPage from "../Common/StaffElementPage";

const AdministratorsPage = ({
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
      staffName="Administradores"
      onReload={onReload}
    />
  );
};

export default AdministratorsPage;
