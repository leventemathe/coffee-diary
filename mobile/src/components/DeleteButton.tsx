import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type DeleteButtonProps = {
  onPress: () => Promise<void>;
};

export function DeleteButton({ onPress }: DeleteButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <MaterialIcons name="delete-outline" size={24} color="black" />
    </Pressable>
  );
}
