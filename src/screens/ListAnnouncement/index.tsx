import React, { useEffect, useState } from "react";
import { View, Text, Button} from 'react-native'
import { Header } from "../components/GlobalComponents/Header";
import { globalStyles } from "../styles/globalStyles";



export function ListAnnouncement() {
  return(
    <View style={globalStyles.main}>
      <Header />
      <View style={{ flex: 1, backgroundColor: 'blue', justifyContent: "center", alignItems: "center"}}>
        <Text style={{ fontSize: 24 }}>
          {/* { name } */}
        </Text>
      </View>
      </View>
  )
}