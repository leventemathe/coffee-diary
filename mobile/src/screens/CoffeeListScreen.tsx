import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Loading } from "@/components/Loading";
import { useDeleteCoffee } from "@/mutations/coffee";
import { useCoffees } from "@/queries/coffee";
import { getRoastLevelTitle } from "@/utils/roastLevel";
import { getRoastProfileTitle } from "@/utils/roastProfile";

type CoffeeListItem = {
  id: number;
  name: string;
  region?: string;
  roastLevel?: string;
  roastProfile?: string;
};

type CoffeeListItemProps = CoffeeListItem & {
  isLast: boolean;
};

function CoffeeListItemComponent({
  id,
  name,
  region,
  roastLevel,
  roastProfile,
  isLast,
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
    <View style={{ ...styles.listItem, borderBottomWidth: isLast ? 0 : 1 }}>
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
    const listItems: CoffeeListItem[] = coffees.map((coffee) => ({
      id: coffee.id,
      name: coffee.name,
      region: coffee.region,
      roastLevel: getRoastLevelTitle(coffee.roastLevel),
      roastProfile: getRoastProfileTitle(coffee.roastProfile),
    }));

    return (
      <>
        <FlatList
          style={styles.list}
          data={listItems}
          renderItem={({ item, index }) => (
            <CoffeeListItemComponent
              {...item}
              isLast={index === listItems.length - 1}
            />
          )}
        />
      </>
    );
  }

  return <Loading />;
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
  listItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
