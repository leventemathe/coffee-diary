import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useForm, Controller } from "react-hook-form";
import { Text } from "react-native";

import { Button } from "@/components/Button";
import { ErrorText } from "@/components/ErrorText";
import { Form, FormRow } from "@/components/Form";
import { TextInput } from "@/components/Input";
import { Select } from "@/components/Select";
import { useCreateCoffee } from "@/mutations/coffee";
import { useCoffees } from "@/queries/coffee";
import { CreateCoffee } from "@/types/Coffee";
import { getAllRoastLevels } from "@/utils/roastLevel";
import { getAllRoastProfiles } from "@/utils/roastProfile";

export function NewCoffeeScreen({ navigation }: BottomTabBarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCoffee>();

  const { mutateAsync: createCoffee } = useCreateCoffee();
  const { refetch: refetchCoffees } = useCoffees();

  async function onSubmit(data: CreateCoffee) {
    try {
      await createCoffee(data);
      navigation.goBack();
      await refetchCoffees();
    } catch (error) {
      // TODO
      console.log("Creating coffee failed: ", error);
    }
  }

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
      <FormRow>
        <Text>Region:</Text>
        <Controller
          name="region"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput value={value} onChangeText={onChange} />
          )}
        />
      </FormRow>
      <FormRow>
        <Text>Roast Level:</Text>
        <Controller
          name="roastLevel"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              items={getAllRoastLevels()}
              onValueChange={onChange}
              value={value}
              placeholder={{
                label: "Select (optional)",
                value: undefined,
              }}
            />
          )}
        />
      </FormRow>
      <FormRow>
        <Text>Roast Profile:</Text>
        <Controller
          name="roastProfile"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              items={getAllRoastProfiles()}
              onValueChange={onChange}
              value={value}
              placeholder={{
                label: "Select (optional)",
                value: undefined,
              }}
            />
          )}
        />
      </FormRow>
      <Button text="Create" onPress={handleSubmit(onSubmit)} />
    </Form>
  );
}
