import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import Icons from "../../components/atoms/Icons";
import BadgeItemForAll from "../../components/organisms/Badge/BadgeItemForAll";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Margin from "../../components/atoms/Margin";
import useHeight from "../../hooks/useHeight";
import { Platform } from "react-native";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;
const SHeader = styled.View`
  padding: ${spacing.offset}px;
`;

const Header = ({ theme, onPress }) => (
  <SHeader>
    <Icons
      type="feather"
      name="chevron-left"
      size={35}
      color={theme.text}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    />
  </SHeader>
);
const Wrapper = styled.View`
  padding: ${spacing.offset}px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${useResponsiveFontSize(15)}px;
`;

const BadgeAllScreen = ({ route, navigation }) => {
  const { type, badges: allBadges } = route.params;
  const theme = useTheme();
  const { NOTCH_TOP } = useHeight();

  return (
    <Container
      style={{ paddingTop: Platform.OS === "android" ? NOTCH_TOP : 0 }}
    >
      <Header theme={theme} onPress={() => navigation.goBack()} />
      <ScrollView>
        <Wrapper>
          {allBadges.map((badge) => (
            <BadgeItemForAll key={badge.type} item={badge} type={type} />
          ))}
        </Wrapper>
        <Margin margin={100} />
      </ScrollView>
    </Container>
  );
};

export default BadgeAllScreen;
