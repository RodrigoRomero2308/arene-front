import { GET_PROFESSIONALS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { Space } from "@mantine/core";

import { useEffect, useState } from "react";
import { ProfessionalsTable } from "../Common/StaffTables";
import { ProfessionalStaffSearch } from "../Common/StaffSearch";

const ProfessionalPage = () => {
  const [getProfessionals] = useLazyQuery(GET_PROFESSIONALS_FOR_TABLE);
  const [professionals, setProfessionals] = useState<IProfessional[]>([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(false);

  const getProfessionalsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setProfessionalsLoading(true);
    getProfessionals({
      variables,
    })
      .then((result) => {
        setProfessionals(
          result.data.getProfessionals.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setProfessionalsLoading(false);
      });
  };

  useEffect(() => {
    getProfessionalsFromServer();
  }, []);

  const handleSearchFormSubmit = (values: IProfessionalFilter) => {
    getProfessionalsFromServer({ filter: values });
  };

  return (
    <>
      <ProfessionalStaffSearch
        handleSearchFormSubmit={handleSearchFormSubmit}
        staffName="Profesionales"
        staffPathName="professionals"
        tableLoading={professionalsLoading}
      />
      <Space h="md" />
      <ProfessionalsTable
        staff={professionals}
        staffLoading={professionalsLoading}
        pathName="professionals"
      />
    </>
  );
};

export default ProfessionalPage;
