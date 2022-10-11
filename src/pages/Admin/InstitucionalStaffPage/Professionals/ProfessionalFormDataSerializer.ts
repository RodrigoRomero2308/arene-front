import { ICreateProfessionalFormDto } from "@/interfaces/ICreateProfessionalDTO";
import { IProfessional } from "@/interfaces/IProfessional";
import {
  dateToTextInputFormat,
  textFromTextInputToDate,
} from "@/utils/date.utils";
import { isDefined } from "class-validator";

export class ProfessionalFormDataSerializer {
  formDataToCreateData(data: ICreateProfessionalFormDto) {
    const input = JSON.parse(JSON.stringify(data));
    /* Transformo datos */

    if (input.phone_type_id) input.phone_type_id = +input.phone_type_id;
    if (isDefined(input.phone_number))
      input.phone_number = String(input.phone_number);
    if (isDefined(input.address.height))
      input.address.height = String(input.address.height);
    if (input.birth_date)
      input.birth_date = textFromTextInputToDate(input.birth_date)?.getTime();

    /* Fin Transofrmo datos */
    return input;
  }

  professionalDataToFormData(data: IProfessional): ICreateProfessionalFormDto {
    const clonedValues: IProfessional = JSON.parse(JSON.stringify(data));

    const { user, ...professional } = clonedValues as any;

    const input = {
      ...user,
      address: user.address || {},
      professional,
    };

    if (input.phone_type_id) input.phone_type_id = String(input.phone_type_id);
    if (input.phone_number) input.phone_number = +input.phone_number;

    if (input.professional.profession)
      input.professional.profession = String(input.professional.profession);

    if (input.professional.speciality)
      input.professional.speciality = String(input.professional.speciality);

    if (input.professional.medical_license_number)
      input.professional.medical_license_number =
        +input.professional.medical_license_number;

    if (input.address.height) input.address.height = +input.address.height;

    if (input.birth_date)
      input.birth_date = dateToTextInputFormat(new Date(input.birth_date));

    delete input.__typename;
    delete input.address.__typename;
    delete input.professional.__typename;
    delete input.profile_picture_id;

    return input;
  }
}
