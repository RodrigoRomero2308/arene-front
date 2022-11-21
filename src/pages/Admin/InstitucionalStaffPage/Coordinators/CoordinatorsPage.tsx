import userContext from "@/context/UserContext/UserContext";
import { GET_COORDINATORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { NoMedicalStaffSearch } from "../Common/StaffSearch";
import { NoMedicalsTable } from "../Common/StaffTables";

const CoordinatorsPage = () => {
  const [getCoordinators] = useLazyQuery(GET_COORDINATORS_FOR_TABLE);
  const [coordinators, setCoordinators] = useState<IProfessional[]>([]);
  const [coordinatorsLoading, setCoordinatorsLoading] = useState(false);

  const getCoordinatorsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setCoordinatorsLoading(true);
    getCoordinators({
      variables,
    })
      .then((result) => {
        setCoordinators(
          result.data.getCoordinators.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCoordinatorsLoading(false);
      });
  };

  useEffect(() => {
    getCoordinatorsFromServer();
  }, []);

  const handleSearchFormSubmit = (values: IProfessionalFilter) => {
    getCoordinatorsFromServer({ filter: values });
  };

  return (
    <>
      <NoMedicalStaffSearch
        handleSearchFormSubmit={handleSearchFormSubmit}
        staffName="Coordinadores"
        staffPathName="coordinators"
        tableLoading={coordinatorsLoading}
      />
      <Space h="md" />
      <NoMedicalsTable
        staff={coordinators}
        staffLoading={coordinatorsLoading}
        pathName="coordinators"
      />
    </>
  );
};

export default CoordinatorsPage;
