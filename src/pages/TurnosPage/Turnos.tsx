import {
  ActionIcon,
  Avatar,
  Badge,
  Center,
  Input,
  Table,
  Tabs,
} from "@mantine/core";
import { useState } from "react";
import TurnoComponent from "./TurnoComponent";

const Turnos = () => {
  const [activeTab, setActiveTab] = useState<string | null>("kinesilogia");
  const horarios = ["8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00"];
  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  const horarioTable = (
    <Table>
      <thead>
        <tr>
          <th>Horario</th>
          {dias.map((dia) => (
            <th>{dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {horarios.map((horario) => (
          <tr>
            <td>{horario}</td>
            <td><TurnoComponent /></td>
            <td><TurnoComponent /></td>
            <td><TurnoComponent /></td>
            <td><TurnoComponent /></td>
            <td><TurnoComponent /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="kinesiologia">Kinesiologia</Tabs.Tab>
        <Tabs.Tab value="ocupacional">Ocupacional</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="kinesiologia">{horarioTable}</Tabs.Panel>
      <Tabs.Panel value="ocupacional">{horarioTable}</Tabs.Panel>
    </Tabs>
  );
};

export default Turnos;
