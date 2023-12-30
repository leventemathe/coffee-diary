import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export function Form({ children }: PropsWithChildren) {
  return <View style={styles.form}>{children}</View>;
}

export function FormRow({ children }: PropsWithChildren) {
  return <View style={styles.formRow}>{children}</View>;
}

const styles = StyleSheet.create({
  form: {
    gap: 24,
    margin: 24,
  },
  formRow: {
    gap: 8,
  },
});
