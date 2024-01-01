import { useForm, Controller } from "react-hook-form";
import { Text } from "react-native";

import { Button } from "./Button";
import { ErrorText } from "./ErrorText";
import { Form, FormRow } from "./Form";
import { TextInput } from "./TextInput";

export type ToolFormValues = {
  name: string;
  description?: string;
};

type NewToolFormProps = {
  onSubmit: (data: ToolFormValues) => Promise<void>;
};

export function NewToolForm({ onSubmit }: NewToolFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ToolFormValues>();

  return (
    <Form>
      <FormRow>
        <Text>Name:</Text>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Required"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <ErrorText>Name is required.</ErrorText>}
      </FormRow>
      <FormRow>
        <Text>Description:</Text>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput value={value} onChangeText={onChange} />
          )}
        />
      </FormRow>
      <Button text="Create" onPress={handleSubmit(onSubmit)} />
    </Form>
  );
}
