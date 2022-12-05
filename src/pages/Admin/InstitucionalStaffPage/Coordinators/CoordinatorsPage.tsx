import { GET_COORDINATORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import StaffElementPage from "../Common/StaffElementPage";

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

  const onReload = () => {
    getCoordinatorsFromServer();
  };

  return (
    <StaffElementPage
      handleSearchFormSubmit={handleSearchFormSubmit}
      staff={coordinators}
      staffLoading={coordinatorsLoading}
      staffName="Coordinadores"
      onReload={onReload}
    />
  );
};

export default CoordinatorsPage;
