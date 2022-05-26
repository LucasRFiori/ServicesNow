import { ImageSquare } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Container, EmptyPhotoContainer, Image, EmptyPhotoText } from './styles';

type Props = TouchableOpacityProps & {
  uri?: string;
}

export function Photo({ uri, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <Container>
        {
          uri ? <Image source={{ uri }} /> : (
            <EmptyPhotoContainer>
              <EmptyPhotoText>
                <ImageSquare size={32} color="#fff" />
              </EmptyPhotoText>
            </EmptyPhotoContainer >
          )
        }
      </Container>
    </TouchableOpacity>
  )
}