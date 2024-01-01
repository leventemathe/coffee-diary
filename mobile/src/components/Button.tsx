import { ReactElement } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type ButtonProps = PressableProps & {
  text: string;
  icon?: ReactElement;
};

export function Button({ text, icon, ...props }: ButtonProps) {
  return (
    <Pressable style={styles.button} {...props}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
