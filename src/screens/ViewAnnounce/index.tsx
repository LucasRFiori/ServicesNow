import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image, ScrollView } from 'react-native'
import { Header } from '../components/GlobalComponents/Header'
import { globalStyles } from '../styles/globalStyles'
import firestore from '@react-native-firebase/firestore'
import { DescriptionContainer, ToPrice, UserContainer, ViewAnnounceContainer } from './style';
import { Title } from './style';
import { Calendar, UserCircle } from 'phosphor-react-native';
import { DateContainer, Separator } from './style';
import { FromPrice, PriceTable } from './style';

interface Params {
  AnnounceId: string;
}

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
  createdBy: string;
}

type UserData = {
  id: string;
  data: {
    createdAt: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string | null;
    uid: string;
  }
}

type User = {
  createdAt: string;
  image: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string | null;
  uid: string;
}

export function ViewAnnounce() {
  const [announce, setAnnounce] = useState<AnnounceType>()
  const [createdBy, setCreatedBy] = useState<User>()
  const route = useRoute();

  const { AnnounceId } = route.params as Params

  useEffect(() => {
    const subscribe = firestore()
    .collection('announcements')
    .where(firestore.FieldPath.documentId(), '==', AnnounceId)
    .onSnapshot(querySnapshot => {
      const data: any = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as AnnounceType[]
      setAnnounce(data[0])
    })
  }, [])

  useEffect(() => {
    if(announce?.createdBy){
      const usersubs = firestore()
      .collection("users")
      .where(firestore.FieldPath.documentId(), '==', announce.createdBy)
      .onSnapshot(querySnapshot => {
        const data: any = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as UserData[]
        setCreatedBy(data[0])
    })
    return() => usersubs();
  }

  }, [announce])

  return(
    <>
    <Header />
    {announce && (
      <View style={globalStyles.main}>
        <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
        <FlatList 
            data={announce?.Images} 
            horizontal
            renderItem={(item) => (
              <Image source={{
                uri: item.item
              }} 
              style={{width: 140, height: 140}}
              />
            )}
          />
        </View>
          <ViewAnnounceContainer>
          <ScrollView>
            <Title>{announce.Title}</Title>
            <PriceTable>
              {announce.FromPrice && <FromPrice>{announce.FromPrice}</FromPrice>}<ToPrice>{announce.ToPrice}</ToPrice>
            </PriceTable>

            <Text style={{fontSize: 16, marginBottom: 5, marginTop: 20}}>Avaliable in:</Text>
            <DateContainer>
              <Calendar size={40}></Calendar><Text style={{fontSize: 15}}>{announce.InitialDate}</Text>
              <Separator>|</Separator>
              <Text style={{fontSize: 15}}>{announce.FinalDate}</Text>
            </DateContainer>
            {announce.Description != '' && (
              <>
                <Text style={{fontSize: 16, marginBottom: 5}}>Description:</Text>
                <DescriptionContainer>
                  <Text style={{fontSize: 17}}>{announce.Description}</Text>
                </DescriptionContainer>
              </>
            )}
            <UserContainer style={{marginTop: 16}}>
              {createdBy && (
                <>
                  {createdBy.image ? (
                    <Image source={{uri: createdBy.image}} style={{width: 50, height: 50, borderRadius: 30}}/>
                  ) : <UserCircle size={50} />}
                  <Text style={{marginLeft: 10, fontSize: 15}}>{createdBy.firstname} {createdBy.lastname}</Text>
                </>
              )}
            </UserContainer>
            </ScrollView>
          </ViewAnnounceContainer>
        </View>
    )}
    </>
  )
}