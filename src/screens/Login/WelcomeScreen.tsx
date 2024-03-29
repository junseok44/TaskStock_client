import React from "react";
import { Linking, Platform } from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import Divider from "../../components/molecules/Login/Divider";
import GoogleBtn from "../../components/molecules/Login/GoogleBtn";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import Policy from "../../components/molecules/Login/Policy";
import SocialBtn from "../../components/molecules/Login/SocialBtn";
import { spacing } from "../../constants/spacing";
import { client } from "../../services/api";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { setSocialLoggedIn } from "../../store/modules/auth";
import { onAppleButtonPress } from "../../utils/authUtils/appleSignIn";
import { onGoogleButtonPress } from "../../utils/authUtils/googleSignIn";
import { onKakaoButtonPress } from "../../utils/authUtils/kakaoSignIn";
import getDeviceId from "../../utils/getDeviceId";

const Login = styled.View`
  gap: ${spacing.padding}px;
  width: 100%;
`;
const WelcomeScreen = ({ navigation }) => {
  const getTheme = useAppSelect((state) => state.theme.value);
  const dispatch = useAppDispatch();

  // 최근 로그인한 기록
  const { strategy } = useAppSelect((state) => state.auth);

  const handleSocialLogin = async (type) => {
    const user = await type();
    const deviceId = await getDeviceId();

    if (!user) return;

    try {
      const response = await client.post("account/login/social", {
        ...user,
        theme: getTheme,
        device_id: deviceId,
        language: "korean",
      });

      if (response.result === "success") {
        const returnValue = {
          ...response,
          deviceId: deviceId,
          strategy: user?.strategy,
        };

        dispatch(setSocialLoggedIn(returnValue));
        console.log("소셜로그인 성공", response);
        navigation.navigate("MainTab", { screen: "Home" });
      } else if (response.result === "fail") {
        Toast.show({
          type: "error",
          text1: `${(response.message, response.strategy)}`,
          visibilityTime: 2000,
          keyboardOffset: 100,
        });
      } else {
        console.log("소셜로그인 실패", response);
      }
    } catch (e) {
      console.log(user?.strategy, "로그인 실패", e);
      Toast.show({
        type: "error",
        text1: "로그인에 실패했습니다. 다시 시도해주세요.",
        visibilityTime: 2000,
        keyboardOffset: 100,
      });
    }
  };

  const theme = useTheme();

  return (
    <LoginContainer background={theme.box}>
      <Login>
        <Divider />
        <GoogleBtn
          onPress={() => handleSocialLogin(onGoogleButtonPress)}
          recentlyLoggiedIn={strategy === "google"}
        />
        <SocialBtn
          type="kakao"
          onPress={() => handleSocialLogin(onKakaoButtonPress)}
          recentlyLoggiedIn={strategy === "kakao"}
        />
        {Platform.OS === "ios" && (
          <SocialBtn
            type="apple"
            onPress={() => {
              handleSocialLogin(onAppleButtonPress);
            }}
            recentlyLoggiedIn={strategy === "apple"}
          />
        )}

        <SocialBtn
          type="email"
          onPress={() => {
            navigation.navigate("EmailLogin");
          }}
          recentlyLoggiedIn={strategy === "local"}
        />
      </Login>

      <Policy
        serviceOnPress={() => {
          Linking.openURL(
            "https://stingy-law-ab2.notion.site/TASKSTOCK-82abb4f1382e489d90921414ad1f6595?pvs=4"
          );
        }}
        privacyOnPress={() => {
          Linking.openURL(
            "https://stingy-law-ab2.notion.site/01acf34630f64e948bad39d86e71b9f3?pvs=4"
          );
        }}
      />
    </LoginContainer>
  );
};

export default WelcomeScreen;
