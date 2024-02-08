import React, { useCallback } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { AppDispatch } from "../../../store/configureStore";
import { useAppSelect } from "../../../store/configureStore.hooks";
import {
  setAddTodoForm,
  closeTodoModal,
  toggleRepeatEndModal,
  useAddTodoMutation,
  useEditTodoMutation,
} from "../../../store/modules/todo/todo";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import Margin from "../../atoms/Margin";
import Text from "../../atoms/Text";
import ProjectItemList from "./ProjectItemList";
import ValueSlider from "./ValueSlider";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { getNewRepeatDay } from "../../../utils/getNewRepeatDay";
import { IsoString } from "../../../@types/calendar";
import useTodos from "../../../hooks/useTodos";
import useValue from "../../../hooks/useValue";
import Section from "../../molecules/Section";

const AddTodoOverlay = styled.Pressable`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerPressable = styled.Pressable`
  width: 85%;
  height: 50%;
`;

const AddTodoBox = styled.View<{ systemTheme: string }>`
  height: 100%;
  border-radius: 20px;
  padding: ${spacing.offset}px;
  background-color: ${({ theme }) => theme.box};
  border-width: ${({ systemTheme }) => (systemTheme === "dark" ? 0.4 : 0)}px;
  border-color: ${({ systemTheme }) =>
    systemTheme === "dark" ? "white" : "transparent"};
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;
  elevation: 5;
`;

const AddTodoContents = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AddTodoBtn = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 14px 75px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background};
`;

const CloseBox = styled.View`
  display: flex;
  align-items: flex-end;
`;

const ValueText = styled(Section.HeaderText)`
  color: ${({ theme }) => theme.palette.red};
`;

const TodoInput = styled.TextInput`
  border-color: ${({ theme }) => theme.textDimmer};
  border-bottom-width: 1px;
  padding: 6px 1px;
  color: ${({ theme }) => theme.text};
`;

const RepeatDayItem = styled.Pressable<{ isSelected?: boolean; size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50px;

  border-width: ${({ isSelected, theme }) =>
    theme.name == "dark" && isSelected ? "1px" : "0px"};
  border-color: ${({ theme }) => theme.text};

  background-color: ${({ theme, isSelected }) =>
    theme.name === "gray" && isSelected
      ? theme.mainBtnReversed
      : theme.mainBtnGray};
`;

const DatePickerBox = styled.Pressable`
  display: flex;
  /* border-bottom-width: 1px; */
  border-color: ${({ theme }) => theme.text};
  padding: 6px 4px;
`;

const dayList = ["월", "화", "수", "목", "금", "토", "일"];

export default function AddTodoModal() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const addTodoForm = useAppSelect((state) => state.todo.addTodoForm);
  const isEditMode = Boolean(
    useAppSelect((state) => state.todo.addTodoForm.todo_id)
  );
  const isRepeatDateModalOpen = useAppSelect(
    (state) => state.todo.isRepeatDateModalOpen
  );
  const scrollViewRef = React.useRef<ScrollView>(null);

  const systemTheme = useAppSelect((state) => state.theme.value);

  const [dayItemWidth, setDayItemWidth] = React.useState(0);

  const value = addTodoForm.level * 1000;

  const {
    getValuesQueryArgs: { startDate, endDate },
  } = useValue();

  const { getAllTodoQueryArg } = useTodos();

  const [addTodo, addTodoResult] = useAddTodoMutation();
  const [editTodo, editTodoResult] = useEditTodoMutation();

  const isHomeDrawerOpen = useAppSelect((state) => state.home.isDrawerOpen);

  const currentDate = useAppSelect((state) => state.calendar.currentDateString);

  const onPressSubmitBtn = () => {
    if (isEditMode) {
      editTodo({
        form: addTodoForm,
        todo_date: addTodoForm.todo_date!,
        original_level: addTodoForm.original_level,
        isHomeDrawerOpen: isHomeDrawerOpen,
        // addTodoForm의 checked는, editModal이 열릴때 들어간다.
        // 그러므로, isEditMode일때는 addTodoForm.checked가 항상 true이다.
        todo_checked: addTodoForm.checked!,
        queryArgs: {
          date: getAllTodoQueryArg.date,
          graph_before_date: startDate,
          graph_today_date: endDate,
        },
      });
    } else {
      addTodo({
        form: addTodoForm,
        add_date: currentDate as IsoString,
        isHomeDrawerOpen: isHomeDrawerOpen,
        stockitem_id: null,
        queryArgs: {
          date: getAllTodoQueryArg.date,
          graph_before_date: startDate,
          graph_today_date: endDate,
        },
      });
    }
  };

  const datePickerInitialDate = addTodoForm.repeat_end_date
    ? new Date(addTodoForm.repeat_end_date)
    : new Date();

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;

    const formattedDate = dayjs(currentDate).format("YYYY-MM-DD");

    dispatch(
      setAddTodoForm({
        name: "repeat_end_date",
        value: formattedDate,
      })
    );
  };

  const toggleIsEndRepeat = () => {
    dispatch(toggleRepeatEndModal());
  };

  return (
    <AddTodoOverlay
      onPress={() => {
        dispatch(closeTodoModal());
      }}
    >
      <InnerPressable>
        <AddTodoBox systemTheme={systemTheme}>
          <CloseBox>
            <Icons
              onPress={() => {
                dispatch(closeTodoModal());
              }}
              type="ionicons"
              name="close"
              size={30}
            />
          </CloseBox>
          <ScrollView
            style={{
              marginBottom: spacing.offset,
            }}
            ref={scrollViewRef}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Pressable
                style={{
                  flex: 1,
                }}
              >
                <AddTodoContents>
                  <Section
                    header={
                      <Section.Header>
                        <Section.HeaderText>할 일</Section.HeaderText>
                      </Section.Header>
                    }
                  >
                    <TodoInput
                      placeholder="할 일을 입력해주세요."
                      placeholderTextColor={theme.textDim}
                      value={addTodoForm.content}
                      onChange={(e) => {
                        dispatch(
                          setAddTodoForm({
                            name: "content",
                            value: e.nativeEvent.text,
                          })
                        );
                      }}
                    ></TodoInput>
                  </Section>
                  <Section
                    header={
                      <Section.Header>
                        <Section.HeaderText>가치</Section.HeaderText>
                        <ValueText>{value}원</ValueText>
                      </Section.Header>
                    }
                  >
                    <ValueSlider></ValueSlider>
                  </Section>
                  {/* <Section
                    header={
                      <Section.Header>
                        <Section.HeaderText systemTheme="dark">
                          반복
                        </Section.HeaderText>
                        {dayList.map((item) => {
                          const isSelected =
                            addTodoForm.repeat_day &&
                            addTodoForm.repeat_day.includes(item);

                          if (isSelected)
                            return <ValueText key={item}>{item}</ValueText>;
                        })}
                      </Section.Header>
                    }
                    gapSize="lg"
                  >
                    <FlexBox gap={10}>
                      {dayList.map((item, index) => {
                        const onPressDayItem = () => {
                          dispatch(
                            setAddTodoForm({
                              name: "repeat_day",
                              value: getNewRepeatDay(
                                addTodoForm.repeat_day,
                                index
                              ),
                            })
                          );
                        };

                        const isSelected =
                          addTodoForm.repeat_day[index] === "1";

                        return (
                          <RepeatDayItem
                            onLayout={(e) => {
                              if (dayItemWidth === 0)
                                setDayItemWidth(e.nativeEvent.layout.width);
                            }}
                            key={index + item}
                            isSelected={isSelected}
                            onPress={onPressDayItem}
                            size={dayItemWidth}
                          >
                            <Text
                              size="md"
                              color={
                                theme.name == "gray"
                                  ? isSelected
                                    ? theme.textReverse
                                    : theme.textDim
                                  : "white"
                              }
                            >
                              {item}
                            </Text>
                          </RepeatDayItem>
                        );
                      })}
                    </FlexBox>
                  </Section>
                  <Section
                    header={
                      <Section.Header>
                        <FlexBox
                          justifyContent="space-between"
                          alignItems="center"
                          styles={{
                            flex: 1,
                            minHeight: useResponsiveFontSize(50),
                          }}
                        >
                          <FlexBox
                            justifyContent="center"
                            alignItems="center"
                            gap={10}
                          >
                            <Section.HeaderText>반복 종료</Section.HeaderText>
                            <Switch
                              onValueChange={toggleIsEndRepeat}
                              value={isRepeatDateModalOpen}
                              thumbColor={theme.textReverse}
                              trackColor={{
                                false: theme.palette.neutral600_gray,
                                true:
                                  theme.name == "gray"
                                    ? theme.palette.neutral500_dark
                                    : theme.text,
                              }}
                            ></Switch>
                          </FlexBox>
                          {isRepeatDateModalOpen && (
                            <DatePickerBox>
                              <DateTimePicker
                                value={datePickerInitialDate}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                                style={{
                                  bottom: 0,
                                }}
                              />
                            </DatePickerBox>
                          )}
                        </FlexBox>
                      </Section.Header>
                    }
                  ></Section> */}
                  <Section
                    gapSize="lg"
                    header={
                      <Section.Header>
                        <Section.HeaderText>프로젝트</Section.HeaderText>
                      </Section.Header>
                    }
                  >
                    <ProjectItemList
                      scrollViewRef={scrollViewRef}
                    ></ProjectItemList>
                  </Section>
                </AddTodoContents>
              </Pressable>
            </KeyboardAvoidingView>
          </ScrollView>

          <AddTodoBtn onPress={onPressSubmitBtn}>
            <Text size="md">
              {isEditMode ? "투두 수정하기" : "투두 추가하기"}
            </Text>
          </AddTodoBtn>
        </AddTodoBox>
      </InnerPressable>
    </AddTodoOverlay>
  );
}
