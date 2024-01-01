import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { NewToolForm, ToolFormValues } from "@/components/NewToolForm";
import { useCreateGrinder } from "@/mutations/grinder";
import { useGrinders } from "@/queries/grinder";

export function NewGrinder({ navigation }: BottomTabBarProps) {
  const { mutateAsync: createGrinder } = useCreateGrinder();
  const { refetch: refetchGrinders } = useGrinders();

  async function handeCreate(data: ToolFormValues) {
    await createGrinder(data);
    navigation.goBack();
    await refetchGrinders();
  }

  return <NewToolForm onSubmit={handeCreate} />;
}
