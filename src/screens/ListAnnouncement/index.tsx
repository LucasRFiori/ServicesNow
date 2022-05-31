import React, { useEffect, useState } from "react";
import { View, Text, Button} from 'react-native'
import { Header } from "../components/GlobalComponents/Header";
import { globalStyles } from "../styles/globalStyles";
import { FilterAndCreateAnnounce } from "./components/FilterAndCreateAnnounce/FilterAndCreateAnnouce";
import firestore from '@react-native-firebase/firestore'
import { AnnounceItem } from "./components/AnnounceItem";

type AnnounceType = {
  id: string;
  Title: string;
  FromPrice: string;
  ToPrice: string;
  InitialDate: string;
  FinalDate: string;
  createdAt: string;
  Images: string[];
  Description: string;
}

export function ListAnnouncement() {
  const [announces, setAnnounces] = useState([] as AnnounceType[])


  useEffect(() => {
    const subscribe = firestore()
      .collection('announcements')
      .onSnapshot(querySnapShot => {
        const data: any = querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        setAnnounces(data)
      })

      return() => subscribe();
  }, [])

  return(
    <View style={globalStyles.main}>
      <Header isFirstPage/>
      <FilterAndCreateAnnounce />
      <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center"}}>
        {announces && announces.map((item, index) => (
          <AnnounceItem announce={item} key={index} />
        ))}
      </View>
      </View>
  )
}