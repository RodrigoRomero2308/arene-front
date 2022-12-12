import { Tabs } from "@mantine/core";
import ProfessionalPage from "./Professionals/ProfessionalsPage";
import AdministratorsPage from "./Administrators/AdministratorsPage";
import PhysiatristsPage from "./Physiatrists/PhysiatristsPage";
import CoordinatorPage from "./Coordinators/CoordinatorsPage";
import DirectorsPage from "./Directors/DirectorsPage";
import { GET_PROFESSIONALS_FOR_TABLE } from "@/graphql/query/professional.query";
import { GET_PHYSIATRISTS_FOR_TABLE } from "@/graphql/query/professional.query";
import { GET_DIRECTORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { GET_COORDINATORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { GET_ADMINISTRATORS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { toastOptions } from "@/shared/toastOptions";

const InstitucionalStaffPage = () => {
  const [getProfessionals] = useLazyQuery(GET_PROFESSIONALS_FOR_TABLE);
  const [getPhysiatrists] = useLazyQuery(GET_PHYSIATRISTS_FOR_TABLE);
  const [getDirectors] = useLazyQuery(GET_DIRECTORS_FOR_TABLE);
  const [getAdministrators] = useLazyQuery(GET_ADMINISTRATORS_FOR_TABLE);
  const [getCoordinators] = useLazyQuery(GET_COORDINATORS_FOR_TABLE);

  const [professionals, setProfessionals] = useState<IProfessional[]>([]);
  const [physiatrists, setPhysiatrists] = useState<IProfessional[]>([]);
  const [directors, setDirectors] = useState<IProfessional[]>([]);
  const [administrators, setAdministrators] = useState<IProfessional[]>([]);
  const [coordinators, setCoordinators] = useState<IProfessional[]>([]);

  const [tablesLoading, setTablesLoading] = useState(false);

  const getProfessionalsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setTablesLoading(true);
    getProfessionals({
      variables,
    })
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        setProfessionals(
          result.data.getProfessionals.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((error: any) => {
        toast.error(
          parseGraphqlErrorMessage(error) || error.message,
          toastOptions
        );
      })
      .finally(() => {
        setTablesLoading(false);
      });
  };

  const getPhysiatristsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setTablesLoading(true);
    getPhysiatrists({
      variables,
    })
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
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
        setTablesLoading(false);
      });
  };

  const getDirectorsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setTablesLoading(true);
    getDirectors({
      variables,
    })
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
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
        setTablesLoading(false);
      });
  };

  const getAdministratorsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setTablesLoading(true);
    getAdministrators({
      variables,
    })
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
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
        setTablesLoading(false);
      });
  };

  const getCoordinatorsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setTablesLoading(true);
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
        setTablesLoading(false);
      });
  };

  const executeOperation = () => {
    Promise.all([
      getProfessionalsFromServer(),
      getPhysiatristsFromServer(),
      getDirectorsFromServer(),
      getAdministratorsFromServer(),
      getCoordinatorsFromServer(),
    ]).catch((error) => {
      toast.error(
        parseGraphqlErrorMessage(error) || error.message,
        toastOptions
      );
    });
  };

  useEffect(() => {
    executeOperation();
  }, []);

  const handleSearchFormSubmitProfessionals = (values: IProfessionalFilter) => {
    getProfessionalsFromServer({ filter: values });
  };

  const handleSearchFormSubmitPhysiatrists = (values: IProfessionalFilter) => {
    getPhysiatristsFromServer({ filter: values });
  };

  const handleSearchFormSubmitDirectors = (values: IProfessionalFilter) => {
    getDirectorsFromServer({ filter: values });
  };

  const handleSearchFormSubmitAdministrators = (
    values: IProfessionalFilter
  ) => {
    getAdministratorsFromServer({ filter: values });
  };

  const handleSearchFormSubmitCoordinators = (values: IProfessionalFilter) => {
    getCoordinatorsFromServer({ filter: values });
  };

  const tabs = {
    professionals: "professionals",
    administrators: "administrators",
    physiatrists: "physiatrists",
    coordinators: "coordinators",
    directors: "directors",
  };

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  let defaultTab = searchParams.get("tab");

  if (defaultTab && !Object.values(tabs).includes(defaultTab)) {
    defaultTab = null;
  }

  return (
    <>
      <Tabs
        variant="outline"
        radius="md"
        defaultValue={defaultTab || "professionals"}
      >
        <Tabs.List>
          <Tabs.Tab value={tabs.professionals} onClick={() => {}}>
            Profesionales
          </Tabs.Tab>
          <Tabs.Tab value={tabs.administrators}>Administradores</Tabs.Tab>
          <Tabs.Tab value={tabs.physiatrists}>Fisiatras</Tabs.Tab>
          <Tabs.Tab value={tabs.coordinators}>Coordinadores</Tabs.Tab>
          <Tabs.Tab value={tabs.directors}>Directores</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="professionals" pt="xs">
          <ProfessionalPage
            staff={professionals}
            staffLoading={tablesLoading}
            handleSearchFormSubmit={handleSearchFormSubmitProfessionals}
            onReload={executeOperation}
          ></ProfessionalPage>
        </Tabs.Panel>

        <Tabs.Panel value="administrators" pt="xs">
          <AdministratorsPage
            staff={administrators}
            staffLoading={tablesLoading}
            handleSearchFormSubmit={handleSearchFormSubmitAdministrators}
            onReload={executeOperation}
          ></AdministratorsPage>
        </Tabs.Panel>

        <Tabs.Panel value="physiatrists" pt="xs">
          <PhysiatristsPage
            staff={physiatrists}
            staffLoading={tablesLoading}
            handleSearchFormSubmit={handleSearchFormSubmitPhysiatrists}
            onReload={executeOperation}
          ></PhysiatristsPage>
        </Tabs.Panel>

        <Tabs.Panel value="coordinators" pt="xs">
          <CoordinatorPage
            staff={coordinators}
            staffLoading={tablesLoading}
            handleSearchFormSubmit={handleSearchFormSubmitCoordinators}
            onReload={executeOperation}
          ></CoordinatorPage>
        </Tabs.Panel>

        <Tabs.Panel value="directors" pt="xs">
          <DirectorsPage
            staff={directors}
            staffLoading={tablesLoading}
            handleSearchFormSubmit={handleSearchFormSubmitDirectors}
            onReload={executeOperation}
          ></DirectorsPage>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default InstitucionalStaffPage;
