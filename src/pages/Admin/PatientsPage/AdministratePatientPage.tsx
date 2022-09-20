import { phoneTypes } from "@/constants/phoneTypes";
import { CREATE_PATIENT } from "@/graphql/mutation/patient.mutation";
import { ICreatePatientFormDto } from "@/interfaces/ICreatePatientDTO";
import {
  formatInitialDateForTextInput,
  textFromTextInputToDate,
} from "@/utils/date.utils";
import { useMutation } from "@apollo/client";
import {
  Button,
  Divider,
  Grid,
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
import { isDefined } from "class-validator";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPatientPage = () => {
  const [createPatient] = useMutation(CREATE_PATIENT);
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

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
        needs_transfer: true,
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

  const PhoneInputs = useCallback(
    ({
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
    },
    []
  );

  const handleSubmit = async (values: ICreatePatientFormDto) => {
    try {
      setFormLoading(true);
      const input = JSON.parse(JSON.stringify(values));
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
      if (input.birth_date)
        input.birth_date = textFromTextInputToDate(input.birth_date)?.getTime();
      if (input.patient.diagnose_date)
        input.patient.diagnose_date = textFromTextInputToDate(
          input.patient.diagnose_date
        )?.getTime();
      if (input.patient.needs_transfer === "true") {
        input.patient.needs_transfer = true;
      } else {
        input.patient.needs_transfer = false;
      }

      /* Fin Transofrmo datos */

      await createPatient({
        variables: {
          input,
        },
      });

      setFormLoading(false);

      navigate("/app/patients");
    } catch (error) {
      setFormLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
              label="Contraseña"
              required
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
          Guardar
        </Button>
      </form>
    </>
  );
};

export default AdminPatientPage;
