import { phoneTypes } from "@/constants/phoneTypes";
import {
  CREATE_PATIENT,
  UPDATE_PATIENT,
} from "@/graphql/mutation/patient.mutation";
import { GET_PATIENT_BY_ID_TO_UPDATE } from "@/graphql/query/patient.query";
import { ICreatePatientFormDto } from "@/interfaces/ICreatePatientDTO";
import { formatInitialDateForTextInput } from "@/utils/date.utils";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Divider,
  Grid,
  LoadingOverlay,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  Space,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { LooseKeys } from "@mantine/form/lib/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PatientFormDataSerializer } from "./PatientFormDataSerializer";

const AdminPatientPage = () => {
  const [createPatient] = useMutation(CREATE_PATIENT);
  const [updatePatient] = useMutation(UPDATE_PATIENT);
  const [formLoading, setFormLoading] = useState(false);
  const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID_TO_UPDATE);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<ICreatePatientFormDto>({
    initialValues: {
      birth_date: "",
      dni: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      patient: {
        diagnose: "",
        needs_transfer: "true",
        diagnose_date: formatInitialDateForTextInput(new Date()),
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

  const getPatientFromServer = async (userId: number) => {
    try {
      setFormLoading(true);
      const data = await getPatientData({
        variables: {
          id: userId,
        },
      });

      const formData = new PatientFormDataSerializer().patientDataToFormData(
        data.data.getPatientById
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
      getPatientFromServer(Number(params.user_id));
    }

    return () => {};
  }, []);

  const PhoneInputs = ({
    form,
    typeProperty,
    numberProperty,
  }: {
    form: UseFormReturnType<ICreatePatientFormDto>;
    typeProperty: LooseKeys<ICreatePatientFormDto>;
    numberProperty: LooseKeys<ICreatePatientFormDto>;
  }) => {
    return (
      <>
        <Grid.Col md={4}>
          <Select
            searchable
            data={phoneTypes}
            label="Tipo Tel."
            {...form.getInputProps(typeProperty)}
          ></Select>
        </Grid.Col>
        <Grid.Col md={4}>
          <NumberInput
            hideControls
            label="Teléfono"
            {...form.getInputProps(numberProperty)}
          ></NumberInput>
        </Grid.Col>
      </>
    );
  };

  const saveOperation = useCallback(
    (input) => {
      if (!isUpdate) {
        return createPatient({
          variables: {
            input,
          },
        });
      }

      const user_id = input.patient.user_id;

      delete input.patient.user_id;

      const variables = {
        input,
        id: user_id,
      };

      return updatePatient({
        variables,
      });
    },
    [isUpdate]
  );

  const handleSubmit = useCallback(
    async (values: ICreatePatientFormDto) => {
      try {
        setFormLoading(true);

        const input = new PatientFormDataSerializer().formDataToCreateData(
          values
        );

        await saveOperation(input);

        setFormLoading(false);

        navigate("/app/patients");
      } catch (error) {
        console.error(error);
        setFormLoading(false);
      }
    },
    [saveOperation]
  );

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div style={{ position: "relative" }}>
          <Title order={4}>Datos del paciente:</Title>
          <Space h="sm" />
          <Grid>
            <Grid.Col md={4}>
              <TextInput
                label="Nombre"
                required
                {...form.getInputProps("firstname")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Apellido"
                required
                {...form.getInputProps("lastname")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Email"
                required
                {...form.getInputProps("email")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput label="DNI" {...form.getInputProps("dni")}></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <PasswordInput
                label={isUpdate ? "Actualizar contraseña" : "Contraseña"}
                required={!isUpdate}
                {...form.getInputProps("password")}
              ></PasswordInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                type="date"
                required
                label="Fecha de nacimiento"
                {...form.getInputProps("birth_date")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Género"
                {...form.getInputProps("gender")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Estado Civil"
                {...form.getInputProps("marital_status")}
              ></TextInput>
            </Grid.Col>
            <PhoneInputs
              form={form}
              typeProperty="phone_type_id"
              numberProperty="phone_number"
            />
          </Grid>
          <Space h="lg" />
          <Divider></Divider>
          <Space h="sm" />
          <Title order={4}>Datos residenciales del paciente:</Title>
          <Space h="sm" />
          <Grid>
            <Grid.Col md={4}>
              <TextInput
                label="Calle"
                required
                {...form.getInputProps("address.street")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <NumberInput
                hideControls
                label="Altura"
                required
                {...form.getInputProps("address.height")}
              ></NumberInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Nro Dpto"
                {...form.getInputProps("address.flat_number")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Provincia"
                required
                {...form.getInputProps("address.province")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Ciudad"
                required
                {...form.getInputProps("address.city")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Departamento"
                required
                {...form.getInputProps("address.department")}
              ></TextInput>
            </Grid.Col>
          </Grid>
          <Space h="lg" />
          <Divider></Divider>
          <Space h="sm" />
          <Title order={4}>Datos del acompañante:</Title>
          <Space h="sm" />
          <Grid>
            <Grid.Col md={4}>
              <TextInput
                label="Nombre"
                {...form.getInputProps("patient.companion_firstname")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Apellido"
                {...form.getInputProps("patient.companion_lastname")}
              ></TextInput>
            </Grid.Col>
            <PhoneInputs
              form={form}
              typeProperty="patient.companion_phone_type_id"
              numberProperty="patient.companion_phone_number"
            />
          </Grid>
          <Space h="lg" />
          <Divider></Divider>
          <Space h="sm" />
          <Title order={4}>Datos del responsable:</Title>
          <Space h="sm" />
          <Grid>
            <Grid.Col md={4}>
              <TextInput
                label="Nombre"
                {...form.getInputProps("patient.responsible_firstname")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Apellido"
                {...form.getInputProps("patient.responsible_lastname")}
              ></TextInput>
            </Grid.Col>
            <PhoneInputs
              form={form}
              typeProperty="patient.responsible_phone_type_id"
              numberProperty="patient.responsible_phone_number"
            />
          </Grid>
          <Space h="lg" />
          <Divider></Divider>
          <Space h="sm" />
          <Title order={4}>Datos del médico de cabecera:</Title>
          <Space h="sm" />
          <Grid>
            <Grid.Col md={4}>
              <TextInput
                label="Nombre"
                {...form.getInputProps("patient.primary_doctor_firstname")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Apellido"
                {...form.getInputProps("patient.primary_doctor_lastname")}
              ></TextInput>
            </Grid.Col>
            <PhoneInputs
              form={form}
              typeProperty="patient.primary_doctor_phone_type_id"
              numberProperty="patient.primary_doctor_phone_number"
            />
            <Grid.Col>
              <Textarea
                autosize
                minRows={2}
                maxRows={4}
                label="Diagnóstico"
                required
                {...form.getInputProps("patient.diagnose")}
              ></Textarea>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                type="date"
                label="Fecha del diagnóstico"
                required
                {...form.getInputProps("patient.diagnose_date")}
              ></TextInput>
            </Grid.Col>
          </Grid>
          <Space h="lg" />
          <Divider></Divider>
          <Space h="sm" />
          <Title order={4}>Datos de traslado:</Title>
          <Space h="sm" />
          <Grid>
            <Grid.Col md={4}>
              <Radio.Group
                defaultValue="false"
                label="Necesita traslado?"
                {...form.getInputProps("patient.needs_transfer")}
              >
                <Radio value="true" label="Si"></Radio>
                <Radio value="false" label="No"></Radio>
              </Radio.Group>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Cómo se translada?"
                {...form.getInputProps("patient.transfer")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col md={4}>
              <TextInput
                label="Responsable traslado"
                {...form.getInputProps("patient.transfer_responsible")}
              ></TextInput>
            </Grid.Col>
            <PhoneInputs
              form={form}
              typeProperty="patient.transfer_phone_type_id"
              numberProperty="patient.transfer_phone_number"
            />
          </Grid>
          <Space h="lg" />
          <Divider></Divider>
          <Space h="sm" />
          <Button type="submit" loading={formLoading}>
            {isUpdate ? "Actualizar" : "Guardar"}
          </Button>
          <LoadingOverlay visible={formLoading} />
        </div>
      </form>
    </>
  );
};

export default AdminPatientPage;
