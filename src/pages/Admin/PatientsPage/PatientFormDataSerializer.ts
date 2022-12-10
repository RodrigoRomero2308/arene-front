import { ICreatePatientFormDto } from "@/interfaces/ICreatePatientDTO";
import { IPatient } from "@/interfaces/IPatient";
import {
  dateToTextInputFormat,
  textFromTextInputToDate,
} from "@/utils/date.utils";
import { isDefined } from "class-validator";

export class PatientFormDataSerializer {
  formDataToCreateData(data: ICreatePatientFormDto) {
    const input = JSON.parse(JSON.stringify(data));
    /* Transformo datos */

    if (input.phone_type_id) input.phone_type_id = +input.phone_type_id;
    if (isDefined(input.phone_number))
      input.phone_number = String(input.phone_number);
    if (isDefined(input.address.height))
      input.address.height = String(input.address.height);
    if (input.patient.companion_phone_type_id)
      input.patient.companion_phone_type_id =
        +input.patient.companion_phone_type_id;
    if (isDefined(input.patient.companion_phone_number))
      input.patient.companion_phone_number = String(
        input.patient.companion_phone_number
      );
    if (input.patient.responsible_phone_type_id)
      input.patient.responsible_phone_type_id =
        +input.patient.responsible_phone_type_id;
    if (isDefined(input.patient.responsible_phone_number))
      input.patient.responsible_phone_number = String(
        input.patient.responsible_phone_number
      );
    if (input.patient.primary_doctor_phone_type_id)
      input.patient.primary_doctor_phone_type_id =
        +input.patient.primary_doctor_phone_type_id;
    if (isDefined(input.patient.primary_doctor_phone_number))
      input.patient.primary_doctor_phone_number = String(
        input.patient.primary_doctor_phone_number
      );
    if (input.patient.transfer_phone_type_id)
      input.patient.transfer_phone_type_id =
        +input.patient.transfer_phone_type_id;
    if (isDefined(input.patient.transfer_phone_number))
      input.patient.transfer_phone_number = String(
        input.patient.transfer_phone_number
      );
    if (input.patient.needs_transfer === "true") {
      input.patient.needs_transfer = true;
    } else {
      input.patient.needs_transfer = false;
    }
    if (input.patient.cud_companion === "true") {
      input.patient.cud_companion = true;
    } else {
      input.patient.cud_companion = false;
    }

    delete input.patient.patient_status_id;

    /* Fin Transofrmo datos */
    return input;
  }

  patientDataToFormData(data: IPatient): ICreatePatientFormDto {
    const clonedValues: IPatient = JSON.parse(JSON.stringify(data));

    const { user, ...patient } = clonedValues as any;

    const input = {
      ...user,
      address: user.address || {},
      patient,
    };

    if (input.phone_type_id) input.phone_type_id = String(input.phone_type_id);
    if (input.phone_number) input.phone_number = +input.phone_number;

    if (input.patient.companion_phone_type_id)
      input.patient.companion_phone_type_id = String(
        input.patient.companion_phone_type_id
      );
    if (input.patient.companion_phone_number)
      input.patient.companion_phone_number =
        +input.patient.companion_phone_number;

    if (input.patient.responsible_phone_type_id)
      input.patient.responsible_phone_type_id = String(
        input.patient.responsible_phone_type_id
      );
    if (input.patient.responsible_phone_number)
      input.patient.responsible_phone_number =
        +input.patient.responsible_phone_number;

    if (input.patient.primary_doctor_phone_type_id)
      input.patient.primary_doctor_phone_type_id = String(
        input.patient.primary_doctor_phone_type_id
      );
    if (input.patient.primary_doctor_phone_number)
      input.patient.primary_doctor_phone_number =
        +input.patient.primary_doctor_phone_number;

    if (input.patient.transfer_phone_type_id)
      input.patient.transfer_phone_type_id = String(
        input.patient.transfer_phone_type_id
      );
    if (input.patient.transfer_phone_number)
      input.patient.transfer_phone_number =
        +input.patient.transfer_phone_number;

    if (input.address.height) input.address.height = +input.address.height;

    input.patient.needs_transfer = input.patient.needs_transfer
      ? "true"
      : "false";

    input.patient.cud_companion = input.patient.cud_companion
      ? "true"
      : "false";

    delete input.__typename;
    delete input.address.__typename;
    delete input.patient.__typename;
    delete input.profile_picture_id;

    return input;
  }
}
