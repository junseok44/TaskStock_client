import React, { useState } from "react";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import CheckBox from "../../atoms/CheckBox";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import Icons from "../../atoms/Icons";
import { useTheme } from "styled-components/native";
import { useDispatch } from "react-redux";
import { openEditTodoModal } from "../../../store/modules/todo";
import { Todo } from "../../../@types/todo";

const THEME_CONSTANTS = {
  dark: {
    checkedBoxSrc: require("../../../../assets/icons/checked-dark.png"),
    unCheckedBoxSrc: require("../../../../assets/icons/unchecked-dark.png"),
    high: darkTheme.high,
  },
  gray: {
    checkedBoxSrc: require("../../../../assets/icons/checked-light.png"),
    unCheckedBoxSrc: require("../../../../assets/icons/unchecked-light.png"),
    high: grayTheme.high,
  },
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [checked, setChecked] = useState(todo.check);
  const theme = useAppSelect((state) => state.theme.value);

  const styledTheme = useTheme();

  const dispatch = useDispatch();

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      styles={{ paddingBottom: spacing.padding }}
    >
      <FlexBox gap={10} alignItems="center">
        {checked ? (
          <CheckBox
            src={THEME_CONSTANTS[theme]?.checkedBoxSrc}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        ) : (
          <CheckBox
            src={THEME_CONSTANTS[theme]?.unCheckedBoxSrc}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        )}

        <Text size="md">{todo.content}</Text>
      </FlexBox>
      <FlexBox gap={10} alignItems="center">
        {checked ? (
          <Text size="md" color={THEME_CONSTANTS[theme]?.high}>
            +{numberWithCommas(todo.level * 1000)}원
          </Text>
        ) : (
          <Text size="md">{numberWithCommas(todo.level * 1000)}원</Text>
        )}
        <Icons
          type="material"
          name="dots-horizontal"
          size={24}
          color={styledTheme.textDimmer}
          onPress={() => {
            dispatch(
              openEditTodoModal({
                text: todo.content,
                level: todo.level,
                project_id: todo.project_id,
                repeat_day: todo.repeat_day,
                repeat_end_date: todo.repeat_end_date,
                todo_id: todo.todo_id,
              })
            );
          }}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default TodoItem;
