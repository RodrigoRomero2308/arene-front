import {
  CREATE_PROFESSIONAL,
  UPDATE_PROFESSIONAL,
} from "@/graphql/mutation/professional.mutation";
import { GET_PROFESSIONAL_BY_ID_TO_UPDATE } from "@/graphql/query/professional.query";
import { ICreateProfessionalFormDto } from "@/interfaces/ICreateProfessionalDTO";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StaffFormDataSerializer } from "../Common/StaffFormDataSerializer";
import { NoMedicalStaffForm } from "../Common/StaffForms";

const AdminProfessionalPage = () => {
  const [createProfessional] = useMutation(CREATE_PROFESSIONAL);
  const [updateProfessional] = useMutation(UPDATE_PROFESSIONAL);
  const [formLoading, setFormLoading] = useState(false);
  const [getProfessionalData] = useLazyQuery(GET_PROFESSIONAL_BY_ID_TO_UPDATE);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<ICreateProfessionalFormDto>({
    initialValues: {
      birth_date: "",
      dni: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      phone_number: "",
      phone_type_id: "",
      professional: {
        medical_license_number: "",
        profession: "",
        speciality: "",
      },
      address: {
        city: "",
        department: "",
        height: "",
        province: "",
        street: "",
      },
    },
  });

  const getProfessionalFromServer = async (userId: number) => {
    try {
      setFormLoading(true);
      const data = await getProfessionalData({
        variables: {
          id: userId,
        },
      });

      const formData = new StaffFormDataSerializer().staffDataToFormData(
        data.data.getProfessionalById
      );

      form.setValues(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    if (params.user_id && Number.isInteger(+params.user_id)) {
      setIsUpdate(true);
      getProfessionalFromServer(Number(params.user_id));
    }

    return () => {};
  }, []);

  const saveOperation = useCallback(
    (input) => {
      if (!isUpdate) {
        return createProfessional({
          variables: {
            input,
          },
        });
      }

      const user_id = input.professional.user_id;

      delete input.professional.user_id;

      const variables = {
        input,
        id: user_id,
      };

      return updateProfessional({
        variables,
      });
    },
    [isUpdate]
  );

  const handleSubmit = useCallback(
    async (values: ICreateProfessionalFormDto) => {
      try {
        setFormLoading(true);

        const input = new StaffFormDataSerializer().formDataToCreateData(
          values
        );

        await saveOperation(input);

        setFormLoading(false);

        navigate("/app/institucionalStaff?tab=professionals");
      } catch (error) {
        console.error(error);
        setFormLoading(false);
      }
    },
    [saveOperation]
  );

  return (
    <NoMedicalStaffForm
      form={form}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      isUpdate={isUpdate}
      staffName="Profesional"
    />
  );
};

export default AdminProfessionalPage;

{
}
