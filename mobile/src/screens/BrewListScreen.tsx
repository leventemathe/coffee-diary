import { FlatList, Text, View } from "react-native";

import { Loading } from "@/components/Loading";
import { useBrews } from "@/queries/brew";

type BrewListItemProps = {
  coffeeName: string;
  coffeeMakerName: string;
  grinderName: string;
  rating: number;
  date: Date;
};

function BrewListItem({
  coffeeName,
  coffeeMakerName,
  grinderName,
  rating,
  date,
}: BrewListItemProps) {
  return (
    <View>
      <Text>{coffeeName}</Text>
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
    const listData: BrewListItemProps[] = brews.map((brew) => ({
      coffeeName: brew.coffee.name,
      coffeeMakerName: brew.coffeeMaker.name,
      grinderName: brew.grinder.name,
      rating: brew.rating,
      date: brew.createdAt,
    }));

    return (
      <View>
        <FlatList
          data={listData}
          // TODO: type
          renderItem={({ item }) => <BrewListItem {...item} />}
        />
      </View>
    );
  }

  return <Loading />;
}
