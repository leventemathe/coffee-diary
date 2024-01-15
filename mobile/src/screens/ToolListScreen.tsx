import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { DeleteButton } from "@/components/DeleteButton";
import { Loading } from "@/components/Loading";
import { useDeleteCoffeeMaker } from "@/mutations/coffeeMaker";
import { useDeleteGrinder } from "@/mutations/grinder";
import { toolRoutes } from "@/navigation/routes";
import { useCoffeeMakers } from "@/queries/coffeeMaker";
import { useGrinders } from "@/queries/grinder";

type ToolListItem = {
  id: number;
  name: string;
  description?: string;
};

type ToolListItemProps = ToolListItem & {
  isLast: boolean;
  handleDelete: (id: number) => Promise<void>;
};

function ToolListItemComponent({
  id,
  name,
  description,
  isLast,
  handleDelete,
}: ToolListItemProps) {
  return (
    <View style={{ ...styles.listItem, borderBottomWidth: isLast ? 0 : 1 }}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemName}>{name}</Text>
        <Text>{description}</Text>
      </View>
      <DeleteButton onPress={() => handleDelete(id)} />
    </View>
  );
}

type ToolListListProps = {
  toolListItems: ToolListItem[];
  handleDelete: (id: number) => Promise<void>;
};

function ToolList({ toolListItems, handleDelete }: ToolListListProps) {
  return (
    <FlatList
      data={toolListItems}
      renderItem={({ item, index }) => (
        <ToolListItemComponent
          {...item}
          isLast={index === toolListItems.length - 1}
          handleDelete={handleDelete}
        />
      )}
    />
  );
}

export function ToolListScreen({ navigation }: BottomTabBarProps) {
  const {
    data: coffeeMakers,
    error: coffeeMakersError,
    refetch: refetchCoffeeMakers,
  } = useCoffeeMakers();
  const {
    data: grinders,
    error: grindersError,
    refetch: refetchGrinders,
  } = useGrinders();

  const { mutateAsync: deleteCoffeeMaker } = useDeleteCoffeeMaker();
  const { mutateAsync: deleteGrinder } = useDeleteGrinder();

  async function handleDeleteCoffeeMaker(id: number) {
    try {
      await deleteCoffeeMaker(id);
      await refetchCoffeeMakers();
    } catch (e) {
      // TODO
      console.log("Deleting coffee maker failed: ", e);
    }
  }

  async function handleDeleteGrinder(id: number) {
    try {
      await deleteGrinder(id);
      await refetchGrinders();
    } catch (e) {
      // TODO
      console.log("Deleting grinder failed: ", e);
    }
  }

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
            <ToolList
              toolListItems={coffeeMakers}
              handleDelete={handleDeleteCoffeeMaker}
            />
          </>
        )}
        {grinders.length > 0 && (
          <>
            <Text style={styles.title}>Grinders</Text>
            <ToolList
              toolListItems={grinders}
              handleDelete={handleDeleteGrinder}
            />
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
    gap: 6,
  },
  buttons: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemContent: {
    gap: 4,
  },
  listItemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
