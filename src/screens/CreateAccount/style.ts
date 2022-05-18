import { Dimensions, StyleSheet } from "react-native";

var { height, width } = Dimensions.get('window');
export const style = StyleSheet.create({
  createAccHeader: {
    backgroundColor: "#B20600", 
    height: 50, 
    justifyContent: "center"
  },
  h1: {
    fontSize: 26,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 20
  },
  nameInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    paddingLeft: 20,
    alignSelf: 'stretch',
    height: 45,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    marginTop: 10
  },
  inputName: {
    width: width * 0.38,
  },
  createAccBtn: {
    backgroundColor: "#B20600",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25
  }
})