import { IPatient } from "@/interfaces/IPatient";

export const PatientService = () => {
  const hasCompanionData = (patient: IPatient) => {
    return (
      !!patient.companion_firstname ||
      !!patient.companion_lastname ||
      !!patient.companion_phone_type_id ||
      !!patient.companion_phone_number
    );
  };

  const hasResponsibleData = (patient: IPatient) => {
    return (
      !!patient.responsible_firstname ||
      !!patient.responsible_lastname ||
      !!patient.responsible_phone_type_id ||
      !!patient.responsible_phone_number
    );
  };

  const hasPrimaryDoctorData = (patient: IPatient) => {
    return (
      !!patient.primary_doctor_firstname ||
      !!patient.primary_doctor_lastname ||
      !!patient.primary_doctor_phone_type_id ||
      !!patient.primary_doctor_phone_number
    );
  };

  const hasSocialWorkData = (patient: IPatient) => {
    return (
      !!patient.social_work ||
      !!patient.social_work_number ||
      !!patient.social_work_plan ||
      !!patient.social_work_valid_from ||
      !!patient.social_work_valid_to
    );
  };

  return {
    hasCompanionData,
    hasResponsibleData,
    hasPrimaryDoctorData,
    hasSocialWorkData,
  };
};
