import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import styled from "styled-components/native";
import RankingTab from "./RankingTab";
import SnsTabHeader from "./SnsTabHeader";

const Container = styled.View`
  flex: 1;
`;

const RankingContainer = ({
  rankingAll,
  rankingFollowing,
  rankingFollower,
}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "전체체" },
    { key: "second", title: "팔로잉" },
    { key: "third", title: "팔로워" },
  ]);

  const FirstRoute = () => <RankingTab data={rankingAll} />;
  const SecondRoute = () => <RankingTab data={rankingFollowing} />;
  const ThirdRoute = () => <RankingTab data={rankingFollower} />;
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return <SnsTabHeader props={props} setIndex={setIndex} />;
  };
  return (
    <Container>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => renderTabBar(props)}
        initialLayout={{ width: layout.width }}
        onSwipeEnd={() => {}}
        swipeEnabled={true}
      />
    </Container>
  );
};

export default RankingContainer;
