import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Search, ScanBarcode } from "lucide-react-native";
const SearchBar = ({ value, onChange, onPress= () =>{} }) => {
  return (
    <View style={styles.container}>
      <Search size={18} color="#7A7A7A" style={styles.leftIcon} />

      <TextInput
        placeholder="Search."
        placeholderTextColor="#AFAFAF"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      <TouchableOpacity onPress={onPress}>
        <ScanBarcode size={20} color="#7A7A7A" style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,

    // Android elevation
    elevation: 2,
  },

  leftIcon: {
    marginRight: 6,
  },

  rightIcon: {
    marginLeft: 6,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 6,
  },
});