import { View } from "react-native";
import React from "react";
import Text from "../../atoms/Text";
import styled from "styled-components/native";
import Icons, { IconsPic } from "../../atoms/Icons";
import FlexBox from "../../atoms/FlexBox";
import { spacing } from "../../../constants/spacing";
import { useRecoilValue } from "recoil";
import { darkMode } from "../../../atom/theme";
import { darkTheme } from "../../../constants/colors";
import numberWithCommas from "../../../utils/useNumberWithCommas";

const TodoItem = ({ todo }) => {
  const isDark = useRecoilValue(darkMode);

  const checkedBoxSrc = isDark
    ? require("../../../../assets/icons/checked-dark.png")
    : require("../../../../assets/icons/checked-light.png");
  const uncheckedBoxSrc = isDark
    ? require("../../../../assets/icons/unchecked-dark.png")
    : require("../../../../assets/icons/unchecked-light.png");

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      styles={{ paddingBottom: 10 }}
    >
      <FlexBox gap={10} alignItems="center">
        {todo.check ? (
          <IconsPic source={checkedBoxSrc} size={30} />
        ) : (
          <IconsPic source={uncheckedBoxSrc} size={30} />
        )}

        <Text size="md">{todo.text}</Text>
      </FlexBox>
      {todo.check ? (
        <Text size="md" color={darkTheme.high}>
          +{numberWithCommas(todo.level * 1000)}원
        </Text>
      ) : (
        <Text size="md">{numberWithCommas(todo.level * 1000)}원</Text>
      )}
    </FlexBox>
  );
};

export default TodoItem;
