import { Calendar } from "phosphor-react-native";
import React, { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import { Container, InfoContainer, Title } from "./style";

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

export function AnnounceItem({ announce } :AnnounceTypeProps) {
  console.log(announce)

  return(
    <Container>
      <Image source={
        {
          uri: announce.Images[0]
        }
      }
      style={{width: 70, height: 70}}/>
      <InfoContainer>
        <Title>{announce.Title}</Title>
        <Calendar size={28} />
      </InfoContainer>
    </Container>
  )
}