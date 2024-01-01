import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { toolRoutes } from "@/navigation/routes";
import { useCoffeeMakers } from "@/queries/coffeeMaker";
import { useGrinders } from "@/queries/grinder";

type ToolListItem = {
  name: string;
  description?: string;
};

type ToolListItemProps = ToolListItem & {
  isLast: boolean;
};

function ToolListItemComponent({
  name,
  description,
  isLast,
}: ToolListItemProps) {
  return (
    <View style={{ ...styles.listItem, borderBottomWidth: isLast ? 0 : 1 }}>
      <Text style={styles.listItemName}>{name}</Text>
      <Text>{description}</Text>
    </View>
  );
}

type ToolListListProps = {
  toolListItems: ToolListItem[];
};

function ToolList({ toolListItems }: ToolListListProps) {
  return (
    <FlatList
      data={toolListItems}
      renderItem={({ item, index }) => (
        <ToolListItemComponent
          {...item}
          isLast={index === toolListItems.length - 1}
        />
      )}
    />
  );
}

export function ToolListScreen({ navigation }: BottomTabBarProps) {
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
        <View style={styles.buttons}>
          <Button
            text="Coffee Maker"
            icon={<Ionicons name="add" size={24} color="white" />}
            onPress={() => navigation.navigate(toolRoutes.newCoffeeMaker)}
          />
          <Button
            text="Grinder"
            icon={<Ionicons name="add" size={24} color="white" />}
            onPress={() => navigation.navigate(toolRoutes.newGrinder)}
          />
        </View>
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
    width: "100%",
    padding: 12,
    gap: 6,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 14,
  },
  listItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingVertical: 12,
    gap: 4,
  },
  listItemName: {
    fontWeight: "bold",
  },
});
