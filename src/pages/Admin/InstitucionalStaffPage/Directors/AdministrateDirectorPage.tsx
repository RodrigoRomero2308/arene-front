import {
  CREATE_DIRECTOR,
  UPDATE_PROFESSIONAL,
} from "@/graphql/mutation/professional.mutation";
import { GET_PROFESSIONAL_BY_ID_TO_UPDATE } from "@/graphql/query/professional.query";
import { ICreateProfessionalFormDto } from "@/interfaces/ICreateProfessionalDTO";
import { toastOptions } from "@/shared/toastOptions";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StaffFormDataSerializer } from "../Common/StaffFormDataSerializer";
import { StaffForm } from "../Common/StaffForms";

const AdminDirectorPage = () => {
  const [createDirector] = useMutation(CREATE_DIRECTOR);
  const [updateDirector] = useMutation(UPDATE_PROFESSIONAL);
  const [formLoading, setFormLoading] = useState(false);
  const [getDirectorData] = useLazyQuery(GET_PROFESSIONAL_BY_ID_TO_UPDATE);
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

  const getDirectorFromServer = async (userId: number) => {
    try {
      setFormLoading(true);
      const data = await getDirectorData({
        variables: {
          id: userId,
        },
      });

      if (data.error) {
        throw data.error;
      }

      const formData = new StaffFormDataSerializer().staffDataToFormData(
        data.data.getProfessionalById
      );

      form.setValues(formData);
    } catch (error: any) {
      toast.error(
        parseGraphqlErrorMessage(error) || error.message,
        toastOptions
      );
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    if (params.user_id && Number.isInteger(+params.user_id)) {
      setIsUpdate(true);
      getDirectorFromServer(Number(params.user_id));
    }

    return () => {};
  }, []);

  const saveOperation = useCallback(
    (input) => {
      if (!isUpdate) {
        return createDirector({
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

      return updateDirector({
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

        toast.success("Guardado exitosamente", toastOptions);

        navigate("/app/institucionalStaff?tab=directors");
      } catch (error: any) {
        console.error(error);
        toast.error(
          `Ocurrio un error: ${
            parseGraphqlErrorMessage(error) || error.message
          }`,
          toastOptions
        );
        setFormLoading(false);
      }
    },
    [saveOperation]
  );

  return (
    <StaffForm
      handleSubmit={handleSubmit}
      isUpdate={isUpdate}
      staffName="Director"
      form={form}
      formLoading={formLoading}
    ></StaffForm>
  );
};

export default AdminDirectorPage;
