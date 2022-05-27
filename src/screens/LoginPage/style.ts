import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    marginBottom: 50
  },
  loginInputContainer: {
    flexDirection: 'column',
    
  },
  loginInputStyle: {
    paddingLeft: 20,
    alignSelf: 'stretch',
    height: 45,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
  },
  firstInput: {
    marginBottom: 20
  },
  forgotPassBtn: {
    marginVertical: 15
  },
  forgotPassText: {
    color: '#fff',
    textDecorationLine: "underline"
  },
  loginBtn: {
    backgroundColor: "#B20600",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: "700"
  },
  orTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30
  },
  orText: {
    fontWeight: "900",
    color: "#fff",
    fontSize: 15
  },
  socialNetworkButtons: {},
  facebookBtn: {
    backgroundColor: "#1877F2",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 25,
    flexDirection: "row",
  },
  facebookBtnText: {
    marginLeft: 6,
    color: "#fff",
    fontWeight: "900"
  },
  googleBtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 25,
    flexDirection: "row",
    marginBottom: 35
  },
  googleBtnText: {
    marginLeft: 6,
    color: "#000",
    fontWeight: "900"
  },
  createAccButton: {},
  createAccButtonText: {
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline"
  }
})