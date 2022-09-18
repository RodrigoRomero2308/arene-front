import { WithPermission } from "@/components/WithPermission/WithPermission";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { GET_PATIENTS } from "@/graphql/query/patient.query";
import { IPatient } from "@/interfaces/IPatient";
import { userHasPermission } from "@/utils/permission.utils";
import { useLazyQuery } from "@apollo/client";
import {
  Button,
  LoadingOverlay,
  Menu,
  Space,
  Table,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotsVertical, Edit, Plus } from "tabler-icons-react";

const PatientsPage = () => {
  const [getPatients] = useLazyQuery(GET_PATIENTS);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  const getPatientsFromServer = () => {
    setPatientsLoading(true);
    getPatients()
      .then((result) => {
        setPatients(
          result.data.getPatients.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setPatientsLoading(false);
      });
  };

  useEffect(() => {
    getPatientsFromServer();
  }, []);

  return (
    <>
      <Title order={2}>Pacientes</Title>
      <WithPermission permissionRequired={PermissionCodes.PatientCreate}>
        <>
          <Space h="md" />
          <Button
            onClick={() => {
              navigate("/app/patients/new");
            }}
            rightIcon={<Plus />}
          >
            Nuevo
          </Button>
        </>
      </WithPermission>
      <Space h="md" />
      <div style={{ position: "relative" }}>
        <Table striped>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {patients.map((item) => (
              <tr key={item.user_id}>
                <td>{item.user?.dni}</td>
                <td>
                  {item.user
                    ? `${item.user.firstname} ${item.user.lastname}`
                    : ""}
                </td>
                <td>{item.user?.email}</td>
                <td>{item.user?.phone_number}</td>
                <td>
                  <Menu shadow="sm">
                    <Menu.Target>
                      <UnstyledButton>
                        <DotsVertical />
                      </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => {
                          navigate(`/app/patients/edit/${item.user_id}`);
                        }}
                        icon={<Edit />}
                        disabled={
                          !userHasPermission(
                            user,
                            PermissionCodes.PatientUpdate
                          )
                        }
                      >
                        Modificar paciente
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <LoadingOverlay visible={patientsLoading} />
      </div>
    </>
  );
};

export default PatientsPage;
