import userContext from "@/context/UserContext/UserContext";
import { GET_DIRECTORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { NoMedicalStaffSearch } from "../Common/StaffSearch";
import { NoMedicalsTable } from "../Common/StaffTables";

const DirectorsPage = () => {
  const [getDirectors] = useLazyQuery(GET_DIRECTORS_FOR_TABLE);
  const [directors, setDirectors] = useState<IProfessional[]>([]);
  const [directorsLoading, setDirectorsLoading] = useState(false);

  const getDirectorsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setDirectorsLoading(true);
    getDirectors({
      variables,
    })
      .then((result) => {
        console.log(result);
        setDirectors(
          result.data.getDirectors.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setDirectorsLoading(false);
      });
  };

  useEffect(() => {
    getDirectorsFromServer();
  }, []);

  const handleSearchFormSubmit = (values: IProfessionalFilter) => {
    getDirectorsFromServer({ filter: values });
  };

  return (
    <>
      <NoMedicalStaffSearch
        handleSearchFormSubmit={handleSearchFormSubmit}
        staffName="Directores"
        staffPathName="directors"
        tableLoading={directorsLoading}
      />
      <Space h="md" />
      <NoMedicalsTable
        staff={directors}
        staffLoading={directorsLoading}
        pathName="directors"
      />
    </>
  );
};

export default DirectorsPage;
