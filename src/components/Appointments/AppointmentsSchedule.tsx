import { Table } from "@mantine/core";
import CellSchedule from "./CellSchedule";

const AppointmentsSchedule = ({ dia }: { dia: string }) => {
  const horarios = ["8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00"];
  const terapias = [
    "Kinesiología",
    "Terapia Ocupacional",
    "Terapia Social",
    "Fonoaudiología",
    "Psicología",
    "Nutrición",
    "Enfermería",
    "Otras",
  ];

  return (
    <Table>
      <thead>
        <tr>
          <th>Horario</th>
          {terapias.map((terapia) => (
            <th key={terapia}>{terapia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {horarios.map((horario, index) => (
          <tr key={index}>
            <td key={horario}>{horario}</td>
            {terapias.map((terapia) => (
              <td key={terapia}>
                <CellSchedule dia={dia} terapia={terapia} key={dia+terapia}/>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AppointmentsSchedule;
