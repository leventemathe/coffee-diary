import { useForm, Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { ErrorText } from "@/components/ErrorText";
import { Form, FormRow } from "@/components/Form";
import { NumberInput } from "@/components/Input";
import { CreateBrew } from "@/types/Brew";

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
    <View style={styles.view}>
      <Form>
        <FormRow>
          <Text>Input:</Text>
          <Controller
            name="input"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <NumberInput
                keyboardType="numeric"
                placeholder="Required"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.input && <ErrorText>Name is required.</ErrorText>}
        </FormRow>
        <Button text="Create" onPress={handleSubmit(onSubmit)} />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 12,
  },
});
