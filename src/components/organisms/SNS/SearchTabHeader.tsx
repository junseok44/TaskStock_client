import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { NavigationState, SceneRendererProps } from "react-native-tab-view";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

const Container = styled.View`
  padding: 0 ${spacing.offset}px;
  flex-direction: row;
  gap: ${spacing.gutter}px;
`;

const Tab = styled.Pressable`
  padding-bottom: ${useResponsiveFontSize(10)}px;
`;
const TabText = styled.Text<{ isFocused: boolean }>`
  font-size: ${useResponsiveFontSize(20)}px;
  font-family: ${(props) => (props.isFocused ? "bold" : "regular")};
  color: ${(props) =>
    props.isFocused ? props.theme.text : props.theme.textDim};
`;

export default function SnsTabHeader({
  props,
  setIndex,
}: {
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  };
  setIndex: (index: number) => void;
}) {
  const theme = useTheme();

  const [translateValue] = React.useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue: props.navigationState.index,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [props.navigationState.index]);

  const tabWidth = useRef(0);

  return (
    <>
      <Container>
        {props.navigationState.routes.map((route, i) => {
          const isFocused = props.navigationState.index === i;
          return (
            <Tab
              key={props.navigationState.routes[i].title}
              onPress={() => {
                setIndex(i);
              }}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                tabWidth.current = width;
              }}
            >
              <TabText isFocused={isFocused}>
                {props.navigationState.routes[i].title}
              </TabText>
            </Tab>
          );
        })}
        <Animated.View
          style={{
            width: tabWidth.current,
            paddingBottom: useResponsiveFontSize(10),
            borderBottomWidth: useResponsiveFontSize(3),
            borderBottomColor: theme.text,
            position: "absolute",
            bottom: 0,
            left: 0,
            transform: [
              {
                translateX: translateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, tabWidth.current + spacing.gutter],
                }),
              },
            ],
          }}
        />
      </Container>
    </>
  );
}
