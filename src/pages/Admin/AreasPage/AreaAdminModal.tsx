import { CREATE_AREA, UPDATE_AREA } from "@/graphql/mutation/area.mutation";
import { IArea } from "@/interfaces/IArea";
import { toastOptions } from "@/shared/toastOptions";
import { useMutation } from "@apollo/client";
import { Button, Modal, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export const AreaAdminModal = ({
  visible,
  onClose,
  afterCreate,
  initialValues = {
    id: 0,
    name: "",
    description: "",
  },
}: {
  visible?: boolean;
  onClose: () => void;
  afterCreate: () => void;
  initialValues?: IArea;
}) => {
  const [createArea] = useMutation(CREATE_AREA);
  const [updateArea] = useMutation(UPDATE_AREA);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: initialValues,
    validate: {
      name: (value) => {
        if (!value) {
          return "Debe ingresar un nombre";
        }
      },
      description: (value) => {
        if (!value) {
          return "Debe ingresar una descripción";
        }
      },
    },
  });

  const executeOperation = (values: IArea) => {
    const { id, ...input } = values;
    if (id) {
      return updateArea({
        variables: {
          input,
          id,
        },
      });
    }
    return createArea({
      variables: {
        input: input,
      },
    });
  };

  useEffect(() => {
    if (!visible) {
      form.reset();
    } else if (initialValues.id) {
      form.setValues(initialValues);
    }
  }, [visible, initialValues.id]);

  const modalTitle = useMemo(() => {
    if (initialValues.id) return "Actualizar área";
    return "Crear área";
  }, [initialValues.id]);

  const submitButtonLabel = useMemo(() => {
    if (initialValues.id) return "Actualizar";
    return "Crear";
  }, [initialValues.id]);

  return (
    <Modal title={modalTitle} opened={visible || false} onClose={onClose}>
      <form
        onSubmit={form.onSubmit((values) => {
          setLoading(true);
          executeOperation(values)
            .then(() => {
              afterCreate();
              values.id
                ? toast.success("Area actualizada exitosamente", toastOptions)
                : toast.success("Area creada exitosamente", toastOptions);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        })}
      >
        <TextInput
          withAsterisk
          label="Nombre"
          placeholder="Ingrese nombre"
          {...form.getInputProps("name")}
        ></TextInput>
        <Space h="sm" />
        <TextInput
          withAsterisk
          label="Descripción"
          placeholder="Ingrese descripción"
          {...form.getInputProps("description")}
        ></TextInput>
        <Space h="md" />
        <Button type="submit" loading={loading}>
          {submitButtonLabel}
        </Button>
      </form>
    </Modal>
  );
};
