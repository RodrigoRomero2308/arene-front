import { GET_PATIENTS_FOR_TABLE } from "@/graphql/query/patient.query";
import { IPatient, IPatientData, IPatientFilter } from "@/interfaces/IPatient";
import { useLazyQuery } from "@apollo/client";
import { LoadingOverlay, Modal, Table } from "@mantine/core";
import { useEffect, useState } from "react";

const PatientsTable = ({
  visible,
  areaFilter,
  onSelect,
  handleCloseModal,
}: {
  visible: boolean;
  areaFilter: number;
  onSelect: (patient: IPatientData) => Promise<void>;
  handleCloseModal: () => void;
}) => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [getPatients] = useLazyQuery(GET_PATIENTS_FOR_TABLE);

  const getPatientsFromServer = async (variables?: {
    filter: IPatientFilter;
  }) => {
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
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={patientsLoading || selecting} />
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Independencia</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  style={{ cursor: "pointer" }}
                  key={patient.user_id}
                  onClick={async () => {
                    setSelecting(true);
                    await onSelect(patient);
                    setSelecting(false);
                  }}
                >
                  <td>{patient.user?.dni}</td>
                  <td>
                    {patient.user?.firstname} {patient.user?.lastname}
                  </td>
                  <td>{patient.needs_transfer ? "No" : "Si"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No hay pacientes para esta área</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Modal>
  );
};

export default PatientsTable;
