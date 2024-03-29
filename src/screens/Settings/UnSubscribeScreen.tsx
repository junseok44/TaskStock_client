import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import CheckBox from "../../components/atoms/CheckBox";
import FlexBox from "../../components/atoms/FlexBox";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import { TextAreaInput } from "../../components/atoms/TextInput";
import PageHeader from "../../components/molecules/PageHeader";
import UnSubscribeNotice from "../../components/molecules/Settings/UnSubscribeNotice";
import { spacing } from "../../constants/spacing";
import { useClient } from "../../hooks/useClient";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { setUnRegister } from "../../store/modules/auth";
import Toast from "react-native-toast-message";

const THEME_CONSTANTS = {
  dark: {
    checkedBoxSrc: require("../../../assets/icons/checked-dark.png"),
    unCheckedBoxSrc: require("../../../assets/icons/unchecked-dark.png"),
  },
  gray: {
    checkedBoxSrc: require("../../../assets/icons/checked-light.png"),
    unCheckedBoxSrc: require("../../../assets/icons/unchecked-light.png"),
  },
};
const Check = ({
  isChecked,

  theme,
}: {
  theme: string;
  isChecked: boolean;
}) => {
  return isChecked ? (
    <CheckBox src={THEME_CONSTANTS[theme]?.checkedBoxSrc} />
  ) : (
    <CheckBox src={THEME_CONSTANTS[theme]?.unCheckedBoxSrc} />
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0 ${spacing.offset}px;
`;

const UnSubscribeScreen = () => {
  const [reason, setReason] = useState("");
  const theme = useAppSelect((state) => state.theme.value);
  const uTheme = useTheme();

  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useAppDispatch();
  const client = useClient(dispatch);
  const { accessToken } = useAppSelect((state) => state.auth);

  const handleUnSubscribe = async () => {
    if (!isChecked) {
      Toast.show({
        type: "error",
        text1: "회원 탈퇴 유의사항에 동의해주세요.",
        visibilityTime: 2000,
        keyboardOffset: 100,
      });
    } else {
      try {
        const res = await client.delete(
          "account/setting/unregister",
          { content: reason },
          { accessToken }
        );
        console.log(res);
        const { result } = res;
        if (result === "success") {
          await dispatch(setUnRegister());
        }
      } catch (e) {
        console.log("회원 탈퇴 실패: ", e);
      }
    }
  };
  const scrollViewRef = React.useRef<ScrollView>(null);
  return (
    <>
      <PageHeader title="회원 탈퇴" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef}>
          <Container>
            <UnSubscribeNotice />
            <Pressable
              onPress={() => {
                setIsChecked((prev) => !prev);
              }}
            >
              <FlexBox
                alignItems="center"
                styles={{
                  paddingTop: spacing.gutter,
                  paddingBottom: spacing.padding,
                }}
              >
                <Check isChecked={isChecked} theme={theme} />
                <Text
                  size="sm"
                  color={isChecked ? uTheme.text : uTheme.textDim}
                >
                  회원 탈퇴 유의사항을 모두 확인하였으며 동의합니다.
                </Text>
              </FlexBox>
            </Pressable>
            <TextAreaInput
              numberOfLines={30}
              minHeight={useResponsiveFontSize(200)}
              placeholder="탈퇴 사유를 알려주세요.
        고객님의 피드백을 담아 더 나은 TaskStock이 되도록 하겠습니다 :)"
              value={reason}
              onChangeText={(text) => setReason(text)}
              onFocus={() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }}
            ></TextAreaInput>
            <Margin margin={spacing.gutter} />
            <BlackBtn text="탈퇴하기" onPress={handleUnSubscribe} />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default UnSubscribeScreen;
