import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";

export default function GeneralStatusBar() {
  return (
      <StatusBar
        barStyle = "light-content"
        hidden = {true}
        backgroundColor = "#ee1515"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
      />
  );
}