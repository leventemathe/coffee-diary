import { useState } from "react";
import {
  StyleSheet,
  TextInputProps,
  TextInput as RNTextInput,
} from "react-native";

import { getNumber, getNumberyString } from "@/utils/number";

export function TextInput(props: TextInputProps) {
  return <RNTextInput {...props} style={styles.input} />;
}

type NumberInputProps = Omit<TextInputProps, "value" | "onChange"> & {
  value: number;
  onChange: (value: number) => void;
};

export function NumberInput({ value, onChange, ...props }: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState(String(value));

  function onChangeText(str: string) {
    const num = getNumber(str);
    if (num !== undefined) {
      console.log(num);
      onChange(num);
      setDisplayValue(String(num));
    }

    if (getNumberyString(str) !== undefined) {
      setDisplayValue(str);
    }
  }

  // There is an issue with formatting controlled inputs in RN -> flickering
  // https://github.com/facebook/react-native/issues/23578
  return (
    <RNTextInput
      style={styles.input}
      keyboardType="numeric"
      defaultValue={displayValue}
      value={displayValue}
      onChangeText={onChangeText}
      onChange={undefined}
      onKeyPress={undefined}
      onTextInput={undefined}
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderColor: "grey",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
