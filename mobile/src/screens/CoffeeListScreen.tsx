import { FlatList, Text, View } from "react-native";

import { Loading } from "@/components/Loading";
import { useCoffees } from "@/queries/coffee";

type CoffeeListItemProps = {
  name: string;
};

function CoffeeListItem({ name }: CoffeeListItemProps) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}

export function CoffeeListScreen() {
  const { data: coffees, error, isSuccess } = useCoffees();

  console.log("coffees: ", coffees);

  if (error) {
    // TODO
    console.error("Fetching coffees failed: ", error);
  }

  if (isSuccess) {
    return (
      <>
        <View>
          <FlatList
            data={coffees}
            renderItem={({ item }) => <CoffeeListItem name={item.name} />}
          />
        </View>
      </>
    );
  }

  return <Loading />;
}
