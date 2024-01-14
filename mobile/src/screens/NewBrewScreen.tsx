import {
  useForm,
  Controller,
  Control,
  FieldPath,
  FieldErrors,
} from "react-hook-form";
import { Switch, Text, View } from "react-native";
import StarRating from "react-native-star-rating-widget";

import { Button } from "@/components/Button";
import { ErrorText } from "@/components/ErrorText";
import { Form, FormCol, FormRow } from "@/components/Form";
import { NumberInput, TextInput } from "@/components/Input";
import { CreateBrew } from "@/types/Brew";

type BrewNumberColumnProps = {
  name: FieldPath<CreateBrew>;
  title: string;
  control: Control<CreateBrew>;
  errors: FieldErrors<CreateBrew>;
  required?: boolean;
};

function BrewNumberColumn({
  name,
  title,
  control,
  errors,
  required,
}: BrewNumberColumnProps) {
  return (
    <FormCol>
      <Text>{title}:</Text>
      <Controller
        name={name}
        control={control}
        rules={{
          required,
        }}
        render={({ field: { onChange, value } }) => {
          if (typeof value !== "number" && value !== undefined) {
            throw new Error("Only use BrewNumberColumn for numbers");
          }
          return (
            <NumberInput
              keyboardType="numeric"
              placeholder={required ? "Required" : ""}
              value={value}
              onChange={onChange}
            />
          );
        }}
      />
      {errors.input && <ErrorText>{title} is required.</ErrorText>}
    </FormCol>
  );
}

export function NewBrewScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBrew>({
    defaultValues: {
      input: 18,
      output: 36,
      preInfusion: false,
      pressure: 9,
      time: 27,
    },
  });

  async function onSubmit() {}

  return (
    <Form>
      <FormRow>
        <BrewNumberColumn
          name="input"
          title="Input"
          control={control}
          errors={errors}
          required
        />
        <BrewNumberColumn
          name="output"
          title="Output"
          control={control}
          errors={errors}
          required
        />
        <BrewNumberColumn
          name="time"
          title="Time"
          control={control}
          errors={errors}
          required
        />
      </FormRow>
      <FormRow>
        <BrewNumberColumn
          name="grindSetting"
          title="Grind Setting"
          control={control}
          errors={errors}
          required
        />
        <BrewNumberColumn
          name="pressure"
          title="Pressure"
          control={control}
          errors={errors}
        />
        <BrewNumberColumn
          name="temperature"
          title="Temperature"
          control={control}
          errors={errors}
        />
      </FormRow>
      <FormRow>
        <Text>Pre infusion:</Text>
        <Controller
          name="preInfusion"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
        <View
          style={{
            height: "100%",
            borderLeftColor: "lightgrey",
            borderLeftWidth: 1,
          }}
        />
        <Controller
          name="rating"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <StarRating rating={value} onChange={onChange} />
          )}
        />
        {errors.input && <ErrorText>Rating is required.</ErrorText>}
      </FormRow>
      <FormRow>
        <FormCol>
          <Text>Other notes:</Text>
          <Controller
            name="otherNotes"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput value={value} onChangeText={onChange} />
            )}
          />
        </FormCol>
      </FormRow>
      <Button text="Create" onPress={handleSubmit(onSubmit)} />
    </Form>
  );
}
