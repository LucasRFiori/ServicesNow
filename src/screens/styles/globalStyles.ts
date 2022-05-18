import { Dimensions, StyleSheet } from "react-native";

var { height, width } = Dimensions.get('window');
export const globalStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00092C"
  },
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: width * 0.1
  }
})