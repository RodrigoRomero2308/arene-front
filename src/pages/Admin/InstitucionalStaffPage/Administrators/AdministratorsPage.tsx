import { GET_ADMINISTRATORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import StaffElementPage from "../Common/StaffElementPage";

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

  const onReload = () => {
    getAdministratorsFromServer();
  };

  return (
    <StaffElementPage
      handleSearchFormSubmit={handleSearchFormSubmit}
      staff={administrators}
      staffLoading={administratorsLoading}
      staffName="Administradores"
      onReload={onReload}
    />
  );
};

export default AdministratorsPage;
