import { useContext } from "react";
import { useCurrentDate } from "../../../hooks/useCurrentDate";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import useTodos from "../../../hooks/useTodos";
import { Dimensions, Pressable, View } from "react-native";
import { useResizeLayoutOnFocus } from "../../../hooks/useResizeLayoutOnFocus";
import {
  editRetrospectForm,
  useGetMonthlyRetrospectQuery,
} from "../../../store/modules/retrospect/retrospect";
import { DateStringYYYYMM } from "../../../@types/calendar";
import { checkIsSameLocalDay } from "../../../utils/checkIsSameLocalDay";
import ContentLayout from "../../atoms/ContentLayout";
import { DateInfo } from "../../organisms/Home/HomeCalendar";
import ItemContainerBox from "../../molecules/ItemContainerBox";
import Calendar from "../../molecules/Calendar";
import BottomDrawer from "../../molecules/Home/BottomDrawer";
import { DateContainer } from "../../molecules/Home/TodoContainer";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import Margin from "../../atoms/Margin";
import { spacing } from "../../../constants/spacing";
import TodoItem from "../../molecules/Home/TodoItem";
import styled from "styled-components/native";
import useUser from "../../../hooks/useUser";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../store/configureStore.hooks";

const ProjectBox = styled.View`
  padding: ${spacing.padding}px;
  border-radius: ${spacing.padding}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.textDimmer};
`;

function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ProjectBox>
      <Text size="md">{title}</Text>
      <Margin margin={10}></Margin>
      {children}
    </ProjectBox>
  );
}

function ProjectDetailFirst({ projectId }: { projectId: number }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { currentDate, currentDateString, subtract1Month, add1Month } =
    useCurrentDate();
  const onPressLeft = subtract1Month;
  const onPressRight = add1Month;

  const {
    DEFAULT_HEIGHT,
    OPEN_STATE,
    headerHeight,
    tabHeight,
    setContentsHeight,
  } = useContext(ComponentHeightContext);

  const { user } = useUser();

  const { data: todos, currentDayTodos } = useTodos();

  const currentProjectTodos = todos.filter(
    (todo) => todo.project_id === projectId
  );

  const currentDayProjectTodos = currentDayTodos.filter((todo) =>
    todo.project_id === projectId ? true : false
  );

  const clientHeight = Dimensions.get("window").height;
  const headerDate = currentDate.format("MM월 DD일");

  const onLayout = useResizeLayoutOnFocus({
    resizeFunction(height) {
      const resizedHeight = height - headerHeight - tabHeight + spacing.padding;
      setContentsHeight(resizedHeight);
    },
  });

  const { data, isLoading, isError } = useGetMonthlyRetrospectQuery({
    date: currentDate.format("YYYY-MM") as DateStringYYYYMM,
  });

  const currentProjectRetrospects = data?.retrospects
    .filter((retrospect) => retrospect.project_id === projectId)
    .filter((retrospect) =>
      checkIsSameLocalDay(retrospect.created_date, currentDateString)
    );

  return (
    <>
      <View
        onLayout={onLayout}
        style={{
          height: clientHeight * 0.48,
        }}
      >
        <ContentLayout>
          <DateInfo
            user={{
              cumulative_value: user.cumulative_value,
              value_yesterday_ago: user.value_yesterday_ago,
            }}
            currentDate={currentDate}
            onPressLeft={onPressLeft}
            onPressRight={onPressRight}
            isShowingInfo={false}
          ></DateInfo>
          <ItemContainerBox>
            <Calendar todos={currentProjectTodos}></Calendar>
          </ItemContainerBox>
        </ContentLayout>
      </View>
      <BottomDrawer
        openState={OPEN_STATE}
        closedState={DEFAULT_HEIGHT}
        onDrawerStateChange={(state) => {}}
      >
        <DateContainer>
          <FlexBox
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            gap={10}
          >
            <Text size="xl" weight="bold">
              {headerDate}
            </Text>
            <ProjectSection title="할 일">
              {currentDayProjectTodos.length > 0 ? (
                currentDayProjectTodos.map((todo) => (
                  <TodoItem key={todo.todo_id} todo={todo}></TodoItem>
                ))
              ) : (
                <Text size="md" color={theme.textDim}>
                  할 일이 없습니다.
                </Text>
              )}
            </ProjectSection>
            <ProjectSection title="기록">
              {isLoading ? (
                <Text size="md">loading...</Text>
              ) : isError ? (
                <Text size="md">기록을 불러오는중 에러가 발생했습니다.</Text>
              ) : currentProjectRetrospects && currentProjectRetrospects[0] ? (
                <Pressable
                  onPress={() => {
                    dispatch(
                      editRetrospectForm({
                        retrospect_id:
                          currentProjectRetrospects[0].retrospect_id,
                        project_id: currentProjectRetrospects[0].project_id,
                        content: currentProjectRetrospects[0].content,
                        date: currentProjectRetrospects[0].created_date.slice(
                          0,
                          10
                        ) as DateString,
                      })
                    );
                    navigation.navigate("ProjectStackWithoutTab", {
                      screen: "RetrospectWrite",
                    });
                  }}
                >
                  <Text size="md" color={theme.text}>
                    {currentProjectRetrospects[0].content.length > 10
                      ? currentProjectRetrospects[0].content.slice(0, 10) +
                        "..."
                      : currentProjectRetrospects[0].content}
                  </Text>
                </Pressable>
              ) : (
                <Text size="md" color={theme.textDim}>
                  기록이 없습니다.
                </Text>
              )}
            </ProjectSection>
          </FlexBox>
        </DateContainer>
      </BottomDrawer>
    </>
  );
}

export default ProjectDetailFirst;
