import { FlatList, StyleSheet, Text, View } from "react-native";

import { Loading } from "@/components/Loading";
import { useCoffees } from "@/queries/coffee";
import { getRoastLevelTitle } from "@/utils/roastLevel";
import { getRoastProfileTitle } from "@/utils/roastProfile";

type CoffeeListItemProps = {
  name: string;
  region?: string;
  roastLevel?: string;
  roastProfile?: string;
};

function CoffeeListItem({
  name,
  region,
  roastLevel,
  roastProfile,
}: CoffeeListItemProps) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemName}>{name}</Text>
      <View style={styles.listItemDescription}>
        <Text>{region}</Text>
        <Text>{roastLevel}</Text>
        <Text>{roastProfile}</Text>
      </View>
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
    gap: 4,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  listItemName: {
    fontWeight: "bold",
  },
  listItemDescription: {
    flexDirection: "row",
    gap: 8,
  },
});
