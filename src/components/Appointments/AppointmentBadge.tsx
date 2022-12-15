import { ICellPatient } from "@/interfaces/IPatient";
import { ActionIcon, Avatar, Badge, Loader } from "@mantine/core";
import { useState } from "react";
import { X } from "tabler-icons-react";

const BadgeAvatar = () => {
  return (
    <Avatar alt="Avatar for badge" size={24} mr={5} src={null} /> //luego se le pasa la imagen desde el backend, aún no estan los servicios
  );
};

function AppointmentBadge({
  patient,
  onRemove,
}: {
  patient: ICellPatient;
  onRemove: (selectedPatient: ICellPatient) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const RemoveButton = () => {
    return (
      <ActionIcon
        size="lg"
        color="teal"
        radius="xl"
        variant="transparent"
        onClick={async () => {
          setLoading(true);
          await onRemove(patient);
          setLoading(false);
        }}
      >
        <X size={10} />
      </ActionIcon>
    );
  };
  return (
    <Badge
      sx={{ paddingLeft: 0 }}
      size="lg"
      radius="xl"
      color="teal"
      leftSection={<BadgeAvatar />}
      rightSection={
        loading ? (
          <div style={{ display: "grid" }}>
            <Loader size="xs" />
          </div>
        ) : (
          <RemoveButton />
        )
      }
      key={patient.appointmentId}
    >
      {patient.user?.firstname} {patient.user?.lastname}
    </Badge>
  );
}

export default AppointmentBadge;
