import {
  ActionIcon,
  Avatar,
  Badge,
  Center,
  Container,
  Group,
  Modal,
  Table,
} from "@mantine/core";
import { SetStateAction, useEffect, useState } from "react";
import { Plus, User, X } from "tabler-icons-react";

const TurnoComponent = () => {
  const [badges, setBadges] = useState<Array<JSX.Element>>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const avatar = (
    <Avatar
      alt="Avatar for badge"
      size={24}
      mr={5}
      src="https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
    />
  );

  const addAppointment = (pacienteSelected: string) => {
    setBadges([...badges, badge(pacienteSelected)]);
  };

  const removeAppointment = (pacienteSelected: string) => {
    var index = badges.indexOf(badge(pacienteSelected));
    setBadges(badges.splice(index, 1));
  };

  const removeButton = (
    <ActionIcon
      size="lg"
      color="teal"
      radius="xl"
      variant="transparent"
      onClick={() => removeAppointment("Enzo Prediger")}
    >
      <X size={10} />
    </ActionIcon>
  );

  const badge = (name: string) => {
    return (
      <Badge
        sx={{ paddingLeft: 0 }}
        size="lg"
        radius="xl"
        color="teal"
        leftSection={avatar}
        rightSection={removeButton}
      >
        {name}
      </Badge>
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

  const handlePacienteSelected = (pacienteSelected: string) => {
    setModalVisible(false);
    addAppointment(pacienteSelected);
  };

  return (
    <>
      <Container size={200} px={0}>
        {badges}
      </Container>
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
            <tr
              style={{ backgroundColor: "green" }}
              onClick={() => handlePacienteSelected("Enzo Prediger")}
            >
              <td>41754062</td>
              <td>Enzo Prediger</td>
              <td>Independiente</td>
            </tr>
            <tr
              style={{ backgroundColor: "green" }}
              onClick={() => handlePacienteSelected("Juan Perez")}
            >
              <td>41754065</td>
              <td>Juan Perez</td>
              <td>Independiente</td>
            </tr>
            <tr
              style={{ backgroundColor: "red" }}
              onClick={() => handlePacienteSelected("Juan Rodriguez")}
            >
              <td>25754062</td>
              <td>Juan Rodriguez</td>
              <td>Movilidad reducida</td>
            </tr>
          </tbody>
        </Table>
      </Modal>
    </>
  );
};

export default TurnoComponent;
