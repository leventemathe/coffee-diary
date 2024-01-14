import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import {
  useForm,
  Controller,
  Control,
  FieldPath,
  UseFormSetValue,
} from "react-hook-form";
import { Switch, Text, View } from "react-native";
import { Item } from "react-native-picker-select";
import StarRating from "react-native-star-rating-widget";

import { Button } from "@/components/Button";
import { ErrorText } from "@/components/ErrorText";
import { Form, FormCol, FormRow } from "@/components/Form";
import { NumberInput, TextInput } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { Select } from "@/components/Select";
import { useCreateBrew } from "@/mutations/brew";
import { useBrews } from "@/queries/brew";
import { useCoffees } from "@/queries/coffee";
import { useCoffeeMakers } from "@/queries/coffeeMaker";
import { useGrinders } from "@/queries/grinder";
import { CreateBrew } from "@/types/Brew";

type BrewNumberColumnProps = {
  name: FieldPath<CreateBrew>;
  title: string;
  control: Control<CreateBrew>;
  required?: boolean;
};

// TODO: refactor other types of columns too
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

function useAsyncFormValues() {
  const { data: coffees, error: coffeesError } = useCoffees();
  const { data: coffeeMakers, error: coffeeMakersError } = useCoffeeMakers();
  const { data: grinders, error: grindersError } = useGrinders();

  const loadingError = coffeesError ?? coffeeMakersError ?? grindersError;

  const coffeeItems = coffees?.map((coffee) => ({
    label: coffee.name,
    value: coffee.id,
  }));

  const coffeeMakerItems = coffeeMakers?.map((coffeeMaker) => ({
    label: coffeeMaker.name,
    value: coffeeMaker.id,
  }));

  const grinderItems = grinders?.map((grinder) => ({
    label: grinder.name,
    value: grinder.id,
  }));

  return { loadingError, coffeeItems, coffeeMakerItems, grinderItems };
}

function useDefaultAsyncFormValues(
  setValue: UseFormSetValue<CreateBrew>,
  coffeeItems?: Item[],
  coffeeMakerItems?: Item[],
  // eslint bug
  // eslint-disable-next-line prettier/prettier
  grinderItems?: Item[]
) {
  const defaultCoffeeId =
    coffeeItems && coffeeItems.length > 0
      ? coffeeItems[coffeeItems.length - 1].value
      : undefined;

  const defaultCoffeeMakerId =
    coffeeMakerItems && coffeeMakerItems.length > 0
      ? coffeeMakerItems[coffeeMakerItems.length - 1].value
      : undefined;

  const defaultGrinderId =
    grinderItems && grinderItems.length > 0
      ? grinderItems[grinderItems.length - 1].value
      : undefined;

  useEffect(() => {
    if (defaultCoffeeId) {
      setValue("coffeeId", defaultCoffeeId);
    }
  }, [defaultCoffeeId]);

  useEffect(() => {
    if (defaultCoffeeMakerId) {
      setValue("coffeeMakerId", defaultCoffeeMakerId);
    }
  }, [defaultCoffeeMakerId]);

  useEffect(() => {
    if (defaultGrinderId) {
      setValue("grinderId", defaultGrinderId);
    }
  }, [defaultGrinderId]);
}

export function NewBrewScreen({ navigation }: BottomTabBarProps) {
  const { loadingError, coffeeItems, coffeeMakerItems, grinderItems } =
    useAsyncFormValues();

  const isReady = coffeeItems && coffeeMakerItems && grinderItems;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateBrew>({
    defaultValues: {
      input: 18,
      output: 36,
      preInfusion: false,
      pressure: 9,
      time: 27,
    },
  });

  useDefaultAsyncFormValues(
    setValue,
    coffeeItems,
    coffeeMakerItems,
    // eslint bug
    // eslint-disable-next-line prettier/prettier
    grinderItems
  );

  const errorsArray = Object.values(errors).map((err) => err.message);

  const { mutateAsync: createBrew } = useCreateBrew();
  const { refetch: refetchBrews } = useBrews();

  async function onSubmit(data: CreateBrew) {
    try {
      await createBrew(data);
      navigation.goBack();
      await refetchBrews();
    } catch (error) {
      // TODO
      console.log("Creating brew failed: ", error);
    }
  }

  if (loadingError) {
    // TODO
    console.log("Fetching data for brew form failed: ", loadingError);
    return null;
  }

  if (!isReady) {
    return <Loading />;
  }

  return (
    <Form>
      <FormRow>
        <FormCol>
          <Text>Coffee:</Text>
          <Controller
            name="coffeeId"
            control={control}
            rules={{
              required: "Coffee is required",
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                items={coffeeItems}
                onValueChange={onChange}
                value={value}
                placeholder={{
                  label: "Select",
                  value: undefined,
                }}
              />
            )}
          />
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <Text>Coffee Maker:</Text>
          <Controller
            name="coffeeMakerId"
            control={control}
            rules={{
              required: "Coffee Maker is required",
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                items={coffeeMakerItems}
                onValueChange={onChange}
                value={value}
                placeholder={{
                  label: "Select",
                  value: undefined,
                }}
              />
            )}
          />
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <Text>Grinder:</Text>
          <Controller
            name="grinderId"
            control={control}
            rules={{
              required: "Grinder is required",
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                items={grinderItems}
                onValueChange={onChange}
                value={value}
                placeholder={{
                  label: "Select",
                  value: undefined,
                }}
              />
            )}
          />
        </FormCol>
      </FormRow>
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
