import { GET_PHYSIATRISTS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { Space } from "@mantine/core";
import { PhysiatristsTable } from "../Common/StaffTables";
import { PhysiatristStaffSearch } from "../Common/StaffSearch";
import { useEffect, useState } from "react";

const PhysiatristPage = () => {
  const [getPhysiatrists] = useLazyQuery(GET_PHYSIATRISTS_FOR_TABLE);
  const [physiatrists, setPhysiatrists] = useState<IProfessional[]>([]);
  const [physiatristsLoading, setPhysiatristsLoading] = useState(false);

  const getPhysiatristsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setPhysiatristsLoading(true);
    getPhysiatrists({
      variables,
    })
      .then((result) => {
        setPhysiatrists(
          result.data.getPhysiatrists.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setPhysiatristsLoading(false);
      });
  };

  useEffect(() => {
    getPhysiatristsFromServer();
  }, []);

  const handleSearchFormSubmit = (values: IProfessionalFilter) => {
    getPhysiatristsFromServer({ filter: values });
  };

  return (
    <>
      <PhysiatristStaffSearch
        handleSearchFormSubmit={handleSearchFormSubmit}
        staffName="Fisiatras"
        staffPathName="physiatrists"
        tableLoading={physiatristsLoading}
      />
      <Space h="md" />
      <PhysiatristsTable
        staff={physiatrists}
        staffLoading={physiatristsLoading}
        pathName="physiatrists"
      />
    </>
  );
};

export default PhysiatristPage;
