import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const ContainerLoading = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${RFPercentage(10)}px;
`

export const HighlightCardsContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
  }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`
