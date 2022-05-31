import { Calendar, CurrencyDollar } from "phosphor-react-native";
import React, { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import { Container, DateContainer, FromPrice, InfoContainer, PriceTable, Separator, Title, ToPrice } from "./style";

type AnnounceTypeProps = {
  announce: {
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
}

export function AnnounceItem({ announce } :AnnounceTypeProps) {

  return(
    <Container>
      <Image source={
        {
          uri: announce.Images[0]
        }
      }
      style={{width: 70, height: 70, borderRadius: 3}}/>
      <InfoContainer>
        <Title>{announce.Title}</Title>
        <DateContainer>
          <Calendar size={25} /><Text style={{marginLeft: 5}}>{announce.InitialDate}</Text><Separator>|</Separator><Text>{announce.FinalDate}</Text> 
        </DateContainer>
        <PriceTable>
          {announce.FromPrice && <FromPrice>{announce.FromPrice}</FromPrice>}
          <ToPrice>{announce.ToPrice}</ToPrice>
        </PriceTable>
      </InfoContainer>
    </Container>
  )
}