import {
  CREATE_ADMINISTRATOR,
  UPDATE_PROFESSIONAL,
} from "@/graphql/mutation/professional.mutation";
import { GET_PROFESSIONAL_BY_ID_TO_UPDATE } from "@/graphql/query/professional.query";
import { ICreateProfessionalFormDto } from "@/interfaces/ICreateProfessionalDTO";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { validate } from "class-validator";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StaffFormDataSerializer } from "../Common/StaffFormDataSerializer";
import { StaffForm } from "../Common/StaffForms";

const AdminAdministratorPage = () => {
  const [createAdministrator] = useMutation(CREATE_ADMINISTRATOR);
  const [updateAdministrator] = useMutation(UPDATE_PROFESSIONAL);
  const [formLoading, setFormLoading] = useState(false);
  const [getAdministratorData] = useLazyQuery(GET_PROFESSIONAL_BY_ID_TO_UPDATE);
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
    // validate: {
    //   birth_date: (value) => {
    //     if (!value) {
    //       return "Debe ingresar una fecha de nacimiento";
    //     }
    //   },
    //   dni: (value) => {
    //     if (!value) {
    //       return "Debe ingresar un DNI";
    //     }
    //   },
    //   email: (value) => {
    //     if (!value) {
    //       return "Debe ingresar un email";
    //     }
    //   },
    //   firstname: (value) => {
    //     if (!value) {
    //       return "Debe ingresar un nombre";
    //     }
    //   },
    //   lastname: (value) => {
    //     if (!value) {
    //       return "Debe ingresar un apellido";
    //     }
    //   },
    //   password: (value) => {
    //     if (!value) {
    //       return "Debe ingresar una contraseña";
    //     }
    //   },
    //   phone_number: (value: any) => {
    //     if (!value) {
    //       return "Debe ingresar un numero de telefono/celular";
    //     }
    //   },
    //   phone_type_id: (value: any) => {
    //     if (!value) {
    //       return "Debe seleccionar tipo de telefono";
    //     }
    //   },
    //   professional: {
    //     medical_license_number: (value) => {
    //       if (!value) {
    //         return "Debe ingresar un CUD";
    //       }
    //     },
    //     profession: (value) => {
    //       if (!value) {
    //         return "Debe ingresar una profesión";
    //       }
    //     },
    //     speciality: (value) => {
    //       if (!value) {
    //         return "Debe ingresar una specialidad";
    //       }
    //     },
    //   },
    //   address: {
    //     city: (value) => {
    //       if (!value) {
    //         return "Debe ingresar una ciudad";
    //       }
    //     },
    //     department: (value) => {
    //       if (!value) {
    //         return "Debe ingresar un departamento";
    //       }
    //     },
    //     height: (value) => {
    //       if (!value) {
    //         return "Debe ingresar la altura";
    //       }
    //     },
    //     province: (value) => {
    //       if (!value) {
    //         return "Debe ingresar una provincia";
    //       }
    //     },
    //     street: (value) => {
    //       if (!value) {
    //         return "Debe ingresar una calle";
    //       }
    //     },
    //   },
    // },
  });

  const getAdministratorFromServer = async (userId: number) => {
    try {
      setFormLoading(true);
      const data = await getAdministratorData({
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
      getAdministratorFromServer(Number(params.user_id));
    }

    return () => {};
  }, []);

  const saveOperation = useCallback(
    (input) => {
      if (!isUpdate) {
        return createAdministrator({
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

      return updateAdministrator({
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

        toast.success("Guardado exitosamente", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/app/institucionalStaff?tab=administrators");
      } catch (error: any) {
        console.error(error);
        toast.error(
          `Ocurrio un error: ${
            parseGraphqlErrorMessage(error) || error.message
          }`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
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
      staffName="Administrador"
      form={form}
      formLoading={formLoading}
    ></StaffForm>
  );
};

export default AdminAdministratorPage;
