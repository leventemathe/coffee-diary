import { StyleSheet } from "react-native";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";

export function Select(props: PickerSelectProps) {
  return <RNPickerSelect {...props} style={styles} />;
}

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderColor: "grey",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 16,
  },
});
