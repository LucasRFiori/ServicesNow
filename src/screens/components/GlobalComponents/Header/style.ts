import { Dimensions, StyleSheet } from "react-native";

var { height, width } = Dimensions.get('window');
export const style = StyleSheet.create({
  headerMain: {
    alignSelf: 'stretch',
    height: 90,
    backgroundColor: "#B20600",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: "center"
  },
  helloUser: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 8
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  manageIconsContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  signinOutBtn: {
    marginLeft: 4
  }
})