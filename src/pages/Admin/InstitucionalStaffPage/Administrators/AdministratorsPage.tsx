import userContext from "@/context/UserContext/UserContext";
import { GET_ADMINISTRATORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { Space } from "@mantine/core";
import { useEffect, useState } from "react";
import StaffElementPage from "../Common/StaffElementPage";
import { NoMedicalStaffSearch } from "../Common/StaffSearch";
import { NoMedicalsTable } from "../Common/StaffTables";

const AdministratorsPage = () => {
  const [getAdministrators] = useLazyQuery(GET_ADMINISTRATORS_FOR_TABLE);
  const [administrators, setAdministrators] = useState<IProfessional[]>([]);
  const [administratorsLoading, setAdministratorsLoading] = useState(false);

  const getAdministratorsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setAdministratorsLoading(true);
    getAdministrators({
      variables,
    })
      .then((result) => {
        setAdministrators(
          result.data.getAdministrators.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAdministratorsLoading(false);
      });
  };

  useEffect(() => {
    getAdministratorsFromServer();
  }, []);

  const handleSearchFormSubmit = (values: IProfessionalFilter) => {
    getAdministratorsFromServer({ filter: values });
  };

  return (
    <StaffElementPage
      handleSearchFormSubmit={handleSearchFormSubmit}
      staff={administrators}
      staffLoading={administratorsLoading}
      staffName="Administradores"
    />
  );
};

export default AdministratorsPage;
