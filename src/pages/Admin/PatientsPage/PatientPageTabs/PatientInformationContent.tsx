import { getPhoneTypeName, phoneTypes } from "@/constants/phoneTypes";
import { IPatient } from "@/interfaces/IPatient";
import { PatientService } from "@/services/patient.service";
import { Space, Text, Title } from "@mantine/core";

const PatientInfoItem = ({
  label,
  info,
}: {
  label: string;
  info?: string | null;
}) => {
  return (
    <>
      <div>
        <Text size="xs">{label}</Text>
        <Text size="md">{info || "-"}</Text>
      </div>
      <Space h="sm" />
    </>
  );
};

const PatientContentTitle = ({ title }: { title: string }) => {
  return (
    <>
      <Title order={4}>{title}</Title>
      <Space h="sm" />
    </>
  );
};

const PatientInformationContent = ({
  patientData,
}: {
  patientData: IPatient;
}) => {
  const {
    hasCompanionData,
    hasResponsibleData,
    hasPrimaryDoctorData,
    hasSocialWorkData,
  } = PatientService();
  return (
    <>
      <PatientContentTitle title="Datos del paciente" />
      <PatientInfoItem label="Nombre" info={patientData.user?.firstname} />
      <PatientInfoItem label="Apellido" info={patientData.user?.lastname} />
      <PatientInfoItem label="DNI" info={patientData.user?.dni} />
      <PatientInfoItem label="Email" info={patientData.user?.email} />
      <PatientInfoItem
        label="Fecha de nacimiento"
        info={patientData.user?.birth_date}
      />
      <PatientInfoItem label="Género" info={patientData.user?.gender} />
      <PatientInfoItem
        label="Estado civil"
        info={patientData.user?.marital_status}
      />
      <PatientInfoItem
        label="Tipo de teléfono"
        info={getPhoneTypeName(patientData.user?.phone_type_id)}
      />
      <PatientInfoItem label="Teléfono" info={patientData.user?.phone_number} />
      <PatientContentTitle title="Datos residenciales" />
      <PatientInfoItem label="Calle" info={patientData.user.address?.street} />
      <PatientInfoItem
        label="Altura"
        info={patientData.user?.address?.height}
      />
      <PatientInfoItem
        label="Nro Dpto"
        info={patientData.user?.address?.flat_number}
      />
      <PatientInfoItem
        label="Provincia"
        info={patientData.user?.address?.province}
      />
      <PatientInfoItem label="Ciudad" info={patientData.user?.address?.city} />
      <PatientInfoItem
        label="Departamento"
        info={patientData.user?.address?.department}
      />
      <PatientContentTitle title="Diagnóstico" />
      <PatientInfoItem label="Diagnóstico" info={patientData.diagnose} />
      <PatientInfoItem
        label="Fecha del diagnóstico"
        info={patientData.diagnose_date}
      />
      {hasPrimaryDoctorData(patientData) ? (
        <>
          <PatientContentTitle title="Datos del médico de cabecera" />
          <PatientInfoItem
            label="Nombre"
            info={patientData.primary_doctor_firstname}
          />
          <PatientInfoItem
            label="Apellido"
            info={patientData.primary_doctor_lastname}
          />
          <PatientInfoItem
            label="Tipo Tel."
            info={getPhoneTypeName(patientData.primary_doctor_phone_type_id)}
          />
          <PatientInfoItem
            label="Teléfono"
            info={patientData.primary_doctor_phone_number}
          />
        </>
      ) : (
        <PatientContentTitle title="Sin datos del médico de cabecera" />
      )}
      {hasCompanionData(patientData) ? (
        <>
          <PatientContentTitle title="Datos del acompañante" />
          <PatientInfoItem
            label="Nombre"
            info={patientData.companion_firstname}
          />
          <PatientInfoItem
            label="Apellido"
            info={patientData.companion_lastname}
          />
          <PatientInfoItem
            label="Tipo Tel."
            info={getPhoneTypeName(patientData.companion_phone_type_id)}
          />
          <PatientInfoItem
            label="Teléfono"
            info={patientData.companion_phone_number}
          />
        </>
      ) : (
        <PatientContentTitle title="Sin datos de acompañante" />
      )}
      {hasResponsibleData(patientData) ? (
        <>
          <PatientContentTitle title="Datos del responsable" />
          <PatientInfoItem
            label="Nombre"
            info={patientData.responsible_firstname}
          />
          <PatientInfoItem
            label="Apellido"
            info={patientData.responsible_lastname}
          />
          <PatientInfoItem
            label="Tipo Tel."
            info={getPhoneTypeName(patientData.responsible_phone_type_id)}
          />
          <PatientInfoItem
            label="Teléfono"
            info={patientData.responsible_phone_number}
          />
        </>
      ) : (
        <PatientContentTitle title="Sin datos de responsable" />
      )}
      <PatientContentTitle title="Datos de traslado" />
      <PatientInfoItem
        label="Necesita traslado?"
        info={patientData.needs_transfer ? "Si" : "No"}
      />
      <PatientInfoItem label="Como se traslada?" info={patientData.transfer} />
      <PatientInfoItem
        label="Responsable traslado"
        info={patientData.transfer_responsible}
      />
      <PatientInfoItem
        label="Tipo de teléfono"
        info={getPhoneTypeName(patientData.transfer_phone_type_id)}
      />
      <PatientInfoItem
        label="Teléfono"
        info={patientData.transfer_phone_number}
      />
      <PatientContentTitle title="Datos de CUD" />
      <PatientInfoItem
        label="Certificado unico de discapacidad"
        info={patientData.cud_number}
      />
      <PatientInfoItem
        label="Acompañante"
        info={patientData.cud_companion ? "Si" : "No"}
      />
      <PatientInfoItem
        label="Vigencia desde"
        info={patientData.cud_valid_from}
      />
      <PatientInfoItem label="Vigencia hasta" info={patientData.cud_valid_to} />
      {hasSocialWorkData(patientData) ? (
        <>
          <PatientContentTitle title="Datos de la obra social" />
          <PatientInfoItem label="Obra social" info={patientData.social_work} />
          <PatientInfoItem label="Plan" info={patientData.social_work_plan} />
          <PatientInfoItem
            label="Número de afiliado"
            info={patientData.social_work_number}
          />
          <PatientInfoItem
            label="Vigencia desde"
            info={patientData.social_work_valid_from}
          />
          <PatientInfoItem
            label="Vigencia hasta"
            info={patientData.social_work_valid_to}
          />
        </>
      ) : (
        <PatientContentTitle title="Sin datos de la obra social" />
      )}
    </>
  );
};

export default PatientInformationContent;
