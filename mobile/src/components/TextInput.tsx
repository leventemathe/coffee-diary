import {
  StyleSheet,
  TextInputProps,
  TextInput as RNTextInput,
} from "react-native";

export function TextInput(props: TextInputProps) {
  return <RNTextInput {...props} style={styles.textInput} />;
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    borderColor: "grey",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
