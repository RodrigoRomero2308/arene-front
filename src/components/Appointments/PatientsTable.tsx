import { GET_PATIENTS_FOR_TABLE } from "@/graphql/query/patient.query";
import { IPatient, IPatientFilter } from "@/interfaces/IPatient";
import { useLazyQuery } from "@apollo/client";
import { Modal, Table } from "@mantine/core";
import { useEffect, useState } from "react";

const PatientsTable = ({
  visible,
  areaFilter,
  onSelect,
  handleCloseModal
}: {
  visible: boolean;
  areaFilter: number;
  onSelect: (patient: IPatient) => void;
  handleCloseModal: () => void;
}) => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [getPatients] = useLazyQuery(GET_PATIENTS_FOR_TABLE);

  const getPatientsFromServer = async (variables?: {
    filter: IPatientFilter;
  }) => {
    if(areaFilter === 0) return;
    setPatientsLoading(true);
    getPatients({
      variables,
    }).then((result) => {
      setPatients(result.data.getPatients);
      setPatientsLoading(false);
    });
  };

  useEffect(() => {
    getPatientsFromServer({
      filter: {
        area_id: areaFilter,
      },
    });
  }, []);

  return (
    <Modal
      title={patientsLoading ? "Cargando..." : "Seleccione un paciente"}
      opened={visible}
      onClose={handleCloseModal}
    >
      <Table>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Independencia</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.user_id} onClick={() => onSelect(patient)}>
              <td key={patient.user?.dni}>{patient.user?.dni}</td>
              <td key={patient.user?.firstname + "" + patient.user?.lastname}>
                {patient.user?.firstname} {patient.user?.lastname}
              </td>
              <td
                key={
                  patient.companion_firstname + " " + patient.companion_lastname
                }
              >
                {patient.needs_transfer ? "No" : "Si"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Modal>
  );
};

export default PatientsTable;
