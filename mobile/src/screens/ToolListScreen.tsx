import { FlatList, StyleSheet, Text, View } from "react-native";

import { Loading } from "@/components/Loading";
import { useCoffeeMakers } from "@/queries/coffeeMaker";
import { useGrinders } from "@/queries/grinder";

type ToolListItemProps = {
  name: string;
  description?: string;
};

function ToolListItem({ name, description }: ToolListItemProps) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{description}</Text>
    </View>
  );
}

type ToolListListProps = {
  toolListItems: ToolListItemProps[];
};

function ToolList({ toolListItems }: ToolListListProps) {
  return (
    <FlatList
      data={toolListItems}
      renderItem={({ item }) => <ToolListItem {...item} />}
    />
  );
}

export function ToolListScreen() {
  const { data: coffeeMakers, error: coffeeMakersError } = useCoffeeMakers();
  const { data: grinders, error: grindersError } = useGrinders();

  if (coffeeMakersError) {
    // TODO
    console.log("Fetching cofee makers failed: ", coffeeMakersError);
  }

  if (grindersError) {
    // TODO
    console.log("Fetching grinders failed: ", grindersError);
  }

  if (coffeeMakers && grinders) {
    return (
      <View style={styles.view}>
        {coffeeMakers.length > 0 && (
          <>
            <Text style={styles.title}>Coffee Makers</Text>
            <ToolList toolListItems={coffeeMakers} />
          </>
        )}
        {grinders.length > 0 && (
          <>
            <Text style={styles.title}>Grinders</Text>
            <ToolList toolListItems={grinders} />
          </>
        )}
      </View>
    );
  }

  return <Loading />;
}

const styles = StyleSheet.create({
  view: {
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
