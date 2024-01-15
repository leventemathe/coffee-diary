import { FlatList, StyleSheet, Text, View } from "react-native";

import { Loading } from "@/components/Loading";
import { useBrews } from "@/queries/brew";
import { getDateTimeString } from "@/utils/date";

type BrewListItemProps = {
  coffeeName: string;
  coffeeMakerName: string;
  grinderName: string;
  rating: number;
  date: string;
  isLast: boolean;
};

function BrewListItem({
  coffeeName,
  coffeeMakerName,
  grinderName,
  rating,
  date,
  isLast,
}: BrewListItemProps) {
  return (
    <View style={{ ...styles.listItem, borderBottomWidth: isLast ? 0 : 1 }}>
      <View style={styles.listItemTitleContainer}>
        <Text style={styles.listItemTitle}>{coffeeName}</Text>
        <View style={styles.listItemToolsContainer}>
          <Text>{coffeeMakerName}</Text>
          <Text>{grinderName}</Text>
        </View>
      </View>
      <View style={styles.listItemUtilsContainer}>
        <Text style={styles.listItemTitle}>{rating}/5</Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
}

export function BrewListScreen() {
  const { data: brews, isSuccess, error } = useBrews();

  if (error) {
    // TODO
    console.error("Fetching brews failed: ", error);
  }

  if (isSuccess) {
    const listData: BrewListItemProps[] = brews.map((brew, index) => ({
      coffeeName: brew.coffee.name,
      coffeeMakerName: brew.coffeeMaker.name,
      grinderName: brew.grinder.name,
      rating: brew.rating,
      date: getDateTimeString(new Date(brew.createdAt)),
      isLast: index === brews.length - 1,
    }));

    return (
      <FlatList
        style={styles.list}
        data={listData}
        renderItem={({ item }) => <BrewListItem {...item} />}
      />
    );
  }

  return <Loading />;
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  listItemTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  listItemTitleContainer: {
    gap: 4,
  },
  listItemToolsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  listItemUtilsContainer: {
    gap: 4,
    alignItems: "flex-end",
  },
});
