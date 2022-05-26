import React, { useEffect, useState } from "react";
import { View, Text, Button} from 'react-native'
import { Header } from "../components/GlobalComponents/Header";
import { globalStyles } from "../styles/globalStyles";
import { FilterAndCreateAnnounce } from "./components/FilterAndCreateAnnounce/FilterAndCreateAnnouce";

export function ListAnnouncement() {
  return(
    <View style={globalStyles.main}>
      <Header />
      <FilterAndCreateAnnounce />
      <View style={{flex: 1, backgroundColor: 'blue', justifyContent: "center", alignItems: "center"}}>
        <Text style={{ fontSize: 24 }}>
        </Text>
      </View>
      </View>
  )
}