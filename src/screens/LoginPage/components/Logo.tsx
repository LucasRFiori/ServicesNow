import React from "react";
import { View } from "react-native";
import LogoImage from '../../../../assets/images/Logo.svg'
import { styles } from "../style";

export function Logo() {
  return(
    <View style={styles.logo}>
      <LogoImage />
    </View>
  )
}