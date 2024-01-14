import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useForm, Controller, Control, FieldPath } from "react-hook-form";
import { Switch, Text, View } from "react-native";
import StarRating from "react-native-star-rating-widget";

import { Button } from "@/components/Button";
import { ErrorText } from "@/components/ErrorText";
import { Form, FormCol, FormRow } from "@/components/Form";
import { NumberInput, TextInput } from "@/components/Input";
import { useCreateBrew } from "@/mutations/brew";
import { useBrews } from "@/queries/brew";
import { CreateBrew } from "@/types/Brew";

type BrewNumberColumnProps = {
  name: FieldPath<CreateBrew>;
  title: string;
  control: Control<CreateBrew>;
  required?: boolean;
};

function BrewNumberColumn({
  name,
  title,
  control,
  required,
}: BrewNumberColumnProps) {
  return (
    <FormCol>
      <Text>{title}:</Text>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${title} is required` : false,
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
    </FormCol>
  );
}

export function NewBrewScreen({ navigation }: BottomTabBarProps) {
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

  const errorsArray = Object.values(errors).map((err) => err.message);

  const { mutateAsync: createBrew } = useCreateBrew();
  const { refetch: refetchBrews } = useBrews();

  async function onSubmit(data: CreateBrew) {
    console.log("data: ", data);
    try {
      await createBrew(data);
      navigation.goBack();
      await refetchBrews();
    } catch (error) {
      // TODO
      console.log("Creating brew failed: ", error);
    }
  }

  return (
    <Form>
      <FormRow>
        <BrewNumberColumn
          name="input"
          title="Input"
          control={control}
          required
        />
        <BrewNumberColumn
          name="output"
          title="Output"
          control={control}
          required
        />
        <BrewNumberColumn name="time" title="Time" control={control} required />
      </FormRow>
      <FormRow>
        <BrewNumberColumn
          name="grindSetting"
          title="Grind Setting"
          control={control}
          required
        />
        <BrewNumberColumn name="pressure" title="Pressure" control={control} />
        <BrewNumberColumn
          name="temperature"
          title="Temperature"
          control={control}
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
            required: "Rating is required",
          }}
          render={({ field: { onChange, value } }) => (
            <StarRating rating={value} onChange={onChange} />
          )}
        />
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
      <FormRow>
        {errorsArray && errorsArray.length > 0 && (
          <ErrorText>{errorsArray[errorsArray.length - 1]}</ErrorText>
        )}
      </FormRow>
      <Button text="Create" onPress={handleSubmit(onSubmit)} />
    </Form>
  );
}
