import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Icon from "../Icon/Icon"; // your custom Icon component

interface Props {
  onPress?: () => void;
  buttonStyles: any;
}


const FloatingCartButton:React.FC<Props> = ({ onPress, buttonStyles }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyles]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Icon
          family="MaterialCommunityIcons"
          name="cart-plus"
          size={22}
          color="#333"
        />
      </View>
    </TouchableOpacity>
  );
};

export default FloatingCartButton;


const styles = StyleSheet.create({
  button: {
    position: "absolute",
  },
  iconContainer: {
    backgroundColor: "white",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});