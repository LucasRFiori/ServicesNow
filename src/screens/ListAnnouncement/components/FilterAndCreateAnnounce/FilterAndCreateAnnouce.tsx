import { useNavigation } from '@react-navigation/native';
import { Faders } from 'phosphor-react-native';
import React from 'react';
import { Pressable } from 'react-native';
import { Container, CreateAnnouncePressable, TextCreateAnnounce } from './style';

// import { Container } from './styles';

export function FilterAndCreateAnnounce() {
  const navigation = useNavigation()

  function handleGoToCreateAnnounce() {
    navigation.navigate('CreateAnnounce')
  }

  return(
    <Container>
      <Pressable>
        <Faders size={35} color="#fff" />
      </Pressable>
      <CreateAnnouncePressable onPress={handleGoToCreateAnnounce}>
        <TextCreateAnnounce>Announce</TextCreateAnnounce>
      </CreateAnnouncePressable>
    </Container>
  )
}