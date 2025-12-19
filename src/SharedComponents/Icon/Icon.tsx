import React from "react";
import { ViewStyle, TextStyle, StyleProp } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const ICON_FAMILIES = {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Entypo,
  EvilIcons,
  SimpleLineIcons,
} as const;

export type IconFamily = keyof typeof ICON_FAMILIES;

interface IconProps {
  family?: IconFamily;       // default = Feather
  name: string;              // icon name
  size?: number;             // default = 24
  color?: string;            // default = #000
  style?: StyleProp<ViewStyle | TextStyle>;
}

const Icon: React.FC<IconProps> = ({
  family = "Feather",
  name,
  size = 24,
  color = "#000",
  style,
}) => {
  const IconSet = ICON_FAMILIES[family];

  if (!IconSet) {
    console.warn(`❌ Icon family "${family}" not found.`);
    return null;
  }

  return <IconSet name={name} size={size} color={color} style={style} />;
};

export default Icon;
