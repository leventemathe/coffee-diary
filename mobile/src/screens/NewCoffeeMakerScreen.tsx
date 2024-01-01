import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { NewToolForm, ToolFormValues } from "@/components/NewToolForm";
import { useCreateCoffeeMaker } from "@/mutations/coffeeMaker";
import { useCoffeeMakers } from "@/queries/coffeeMaker";

export function NewCoffeeMakerScreen({ navigation }: BottomTabBarProps) {
  const { mutateAsync: createCoffeeMaker } = useCreateCoffeeMaker();
  const { refetch: refetchCoffeemakers } = useCoffeeMakers();

  async function handeCreate(data: ToolFormValues) {
    await createCoffeeMaker(data);
    navigation.goBack();
    await refetchCoffeemakers();
  }

  return <NewToolForm onSubmit={handeCreate} />;
}
