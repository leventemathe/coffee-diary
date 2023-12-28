import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { useBrews } from "@/queries/useBrews";

// TODO: types
function BrewListItem({ name }: any) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}

export function BrewsScreen() {
  const { data: brews, isSuccess, isError } = useBrews();

  console.log("brews: ", brews);

  if (isError) {
    // TODO
    console.error("Fetching brews failed...");
  }

  if (isSuccess) {
    return (
      <View>
        <FlatList
          data={brews}
          // TODO: type
          renderItem={({ name }: any) => <BrewListItem name={name} />}
        />
      </View>
    );
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
