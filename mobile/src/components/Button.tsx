import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type ButtonProps = PressableProps & {
  text: string;
};

export function Button({ text, ...props }: ButtonProps) {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 12,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
