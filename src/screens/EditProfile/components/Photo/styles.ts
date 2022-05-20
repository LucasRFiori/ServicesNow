import styled from 'styled-components/native';

export const Container = styled.View`
  width: 140px;
  height: 140px;
  margin-top: 32px;
  margin-bottom: 12px;
`;

export const EmptyPhotoContainer = styled.View`
  width: 140px;
  height: 140px;
  border-width: 3px;
  border-radius: 5px;
  border-color: #fff;
  border-style: dashed;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 5px;
`;

export const EmptyPhotoText = styled.Text`
  font-size: 18px;
  color: #fff;
  text-align: center;
  padding-top: 18px;
  padding-bottom: 18px;
`;