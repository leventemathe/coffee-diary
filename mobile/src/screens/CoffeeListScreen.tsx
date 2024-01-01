import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Loading } from "@/components/Loading";
import { useDeleteCoffee } from "@/mutations/coffee";
import { useCoffees } from "@/queries/coffee";
import { getRoastLevelTitle } from "@/utils/roastLevel";
import { getRoastProfileTitle } from "@/utils/roastProfile";

type CoffeeListItemProps = {
  id: number;
  name: string;
  region?: string;
  roastLevel?: string;
  roastProfile?: string;
};

function CoffeeListItem({
  id,
  name,
  region,
  roastLevel,
  roastProfile,
}: CoffeeListItemProps) {
  const { mutateAsync } = useDeleteCoffee(id);
  const { refetch: refetchCoffees } = useCoffees();

  async function handleDelete() {
    try {
      await mutateAsync();
      await refetchCoffees();
    } catch (e) {
      // TODO
      console.log("Deleting coffee failed: ", e);
    }
  }

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemName}>{name}</Text>
        <View style={styles.listItemDescription}>
          <Text>{region}</Text>
          <Text>{roastLevel}</Text>
          <Text>{roastProfile}</Text>
        </View>
      </View>
      <Pressable onPress={handleDelete}>
        <MaterialIcons name="delete-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
}

export function CoffeeListScreen() {
  const { data: coffees, error, isSuccess } = useCoffees();

  if (error) {
    // TODO
    console.error("Fetching coffees failed: ", error);
  }

  if (isSuccess) {
    const listItems: CoffeeListItemProps[] = coffees.map((coffee) => ({
      id: coffee.id,
      name: coffee.name,
      region: coffee.region,
      roastLevel: getRoastLevelTitle(coffee.roastLevel),
      roastProfile: getRoastProfileTitle(coffee.roastProfile),
    }));

    return (
      <>
        <View>
          <FlatList
            data={listItems}
            renderItem={({ item }) => <CoffeeListItem {...item} />}
          />
        </View>
      </>
    );
  }

  return <Loading />;
}

const styles = StyleSheet.create({
  listItem: {
    padding: 12,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemContent: {
    gap: 4,
  },
  listItemName: {
    fontWeight: "bold",
  },
  listItemDescription: {
    flexDirection: "row",
    gap: 8,
  },
});
