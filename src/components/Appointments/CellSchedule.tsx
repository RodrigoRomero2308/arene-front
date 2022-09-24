import { ActionIcon, Avatar, Badge, Modal, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { Plus, X } from "tabler-icons-react";

const CellSchedule = ({ dia, terapia }: { dia: string; terapia: string }) => {
  interface IPaciente {
    id: string;
    name: string;
    dni: string;
    avatar: string;
    independent: string;
  }

  const [pacientes, setPacientes] = useState<IPaciente[]>([]);
  const [badges, setBadges] = useState<JSX.Element[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const patients = Array<IPaciente>();
  patients.push({
    id: "1",
    name: "Juan Perez",
    dni: "12345678",
    avatar: "https://i.pravatar.cc/150?img=1",
    independent: "Independiente",
  });
  patients.push({
    id: "2",
    name: "Maria Gomez",
    dni: "87654321",
    avatar: "https://i.pravatar.cc/150?img=2",
    independent: "Independiente",
  });
  patients.push({
    id: "3",
    name: "Pedro Lopez",
    dni: "41754062",
    avatar: "https://i.pravatar.cc/150?img=3",
    independent: "Independiente",
  });

  const BadgeAvatar = ({ profileImage }: { profileImage: string }) => {
    return (
      <Avatar alt="Avatar for badge" size={24} mr={5} src={profileImage} />
    );
  };

  const addPatient = (pacienteSelected: IPaciente) => {
    var repeat = pacientes.some((paciente) => paciente.id === pacienteSelected.id)
    if(!repeat) {
      setPacientes([...pacientes, pacienteSelected]);
    } else {
      setPacientes([...pacientes]);
    }
    setModalVisible(false);
  };

  const removePatient = (name: string) => {
    const newPacientes = pacientes.filter((paciente) => paciente.name !== name);
    setPacientes(newPacientes);
  };

  const RemoveButton = ({ pacienteSelected }: { pacienteSelected: string }) => {
    return (
      <ActionIcon
        size="lg"
        color="teal"
        radius="xl"
        variant="transparent"
        onClick={() => removePatient(pacienteSelected)}
      >
        <X size={10} />
      </ActionIcon>
    );
  };

  const addButton = (
    <ActionIcon
      size="xl"
      color="teal"
      radius="xl"
      variant="transparent"
      onClick={() => setModalVisible(true)}
    >
      <Plus size={25} />
    </ActionIcon>
  );

  const badge = (name: string, profileImage: string) => (
    <Badge
      sx={{ paddingLeft: 0 }}
      size="lg"
      radius="xl"
      color="teal"
      leftSection={<BadgeAvatar profileImage={profileImage} />}
      rightSection={<RemoveButton pacienteSelected={name} />}
    >
      {name}
    </Badge>
  );

  useEffect(() => {
    setBadges(
      pacientes.map((paciente) => badge(paciente.name, paciente.avatar))
    );
    console.log(pacientes);
  }, [pacientes]);

  return (
    <>
      {badges}
      {addButton}
      <Modal
        title={"Seleccione un paciente"}
        opened={modalVisible || false}
        onClose={() => setModalVisible(false)}
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
            {patients.map((patient, index) => (
              <tr key={index} onClick={() => addPatient(patient)}>
                <td key={patient.dni}>{patient.dni}</td>
                <td key={patient.name}>{patient.name}</td>
                <td key={patient.independent}>{patient.independent}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal>
    </>
  );
};

export default CellSchedule;
