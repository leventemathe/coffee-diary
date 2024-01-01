import { StyleSheet, TextProps, Text } from "react-native";

export function ErrorText(props: TextProps) {
  return <Text style={styles.text} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
});
