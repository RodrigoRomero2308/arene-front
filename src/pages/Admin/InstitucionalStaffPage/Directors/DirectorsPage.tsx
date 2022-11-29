import userContext from "@/context/UserContext/UserContext";
import { GET_DIRECTORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoMedicalStaffSearch } from "../Common/StaffSearch";

const DirectorsPage = () => {
  const [getDirectors] = useLazyQuery(GET_DIRECTORS_FOR_TABLE);
  const [directors, setDirectors] = useState<IProfessional[]>([]);
  const [directorsLoading, setDirectorsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(userContext);

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
    <NoMedicalStaffSearch
      handleSearchFormSubmit={handleSearchFormSubmit}
      user={user}
      staffName="Directores"
      staffPathName="directors"
      staffPeople={directors}
      tableLoading={directorsLoading}
    ></NoMedicalStaffSearch>
  );
};

export default DirectorsPage;
