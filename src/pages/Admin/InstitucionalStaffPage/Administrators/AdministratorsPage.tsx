import userContext from "@/context/UserContext/UserContext";
import { GET_ADMINISTRATORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { NoMedicalStaffSearch } from "../Common/StaffSearch";

const AdministratorsPage = () => {
  const [getAdministrators] = useLazyQuery(GET_ADMINISTRATORS_FOR_TABLE);
  const [administrators, setAdministrators] = useState<IProfessional[]>([]);
  const [administratorsLoading, setAdministratorsLoading] = useState(false);

  const { user } = useContext(userContext);

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
    <NoMedicalStaffSearch
      handleSearchFormSubmit={handleSearchFormSubmit}
      user={user}
      staffName="Administradores"
      staffPathName="administrators"
      staffPeople={administrators}
      tableLoading={administratorsLoading}
    ></NoMedicalStaffSearch>
  );
};

export default AdministratorsPage;
