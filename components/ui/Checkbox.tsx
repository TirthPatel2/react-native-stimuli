import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Checkbox = ({ isChecked, label = "", styles, toggleValue }: any) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <TouchableOpacity onPress={toggleValue} style={[defaultStyles.checkbox, styles?.checkbox]}>
        <Icon
          name={isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
          size={24}
          color={isChecked ? "black" : "gray"}
        />
      </TouchableOpacity>
      {label ? <Text style={[defaultStyles.label, styles?.label]}>{label}</Text> : null}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default Checkbox;
