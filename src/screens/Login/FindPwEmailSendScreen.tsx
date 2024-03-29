import React, { useState } from "react";
import { BlackBtn } from "../../components/atoms/Buttons";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import { client } from "../../services/api";
import { checkValidEmail } from "../../utils/checkValidity";

// 예외처리
// 1. 가입하지 않은 이메일
// 2. 소셜로그인으로 가입한 이메일은 비밀번호 찾기 불가능

const FindPwEmailSendScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [sending, setSending] = useState(false);

  const sendMail = async () => {
    setSending(true);
    try {
      const responseData = await client.post("account/sendMail/password", {
        email: email,
      });
      const { result, codeId } = responseData;

      if (result === "success") {
        navigation.navigate("EmailCheckCode", {
          email,
          codeId: codeId,
          type: "findPw",
        });
      } else if (result === "fail") {
        setEmailAlert("가입되지 않은 이메일입니다.");
      } else if (result === "social") {
        setEmailAlert(
          "소셜로그인으로 가입된 이메일은 비밀번호 찾기가 불가능합니다."
        );
      } else {
        setEmailAlert("이메일 전송에 실패했습니다.");
      }

      console.log(responseData); // {"codeId": 71, "result": "success"}
    } catch (error) {
      console.error("[client] 이메일 전송 오류 발생:", error);
      setEmailAlert("이메일 전송 중 오류가 발생했습니다.");
    }
    setSending(false);
  };

  const handleSendCode = () => {
    if (checkValidEmail(email)) {
      sendMail();
    } else {
      // 이메일 형식 오류 check
      setEmailAlert("유효한 이메일 주소를 입력해주세요.");
    }
  };

  return (
    <LoginContainer comment="인증번호를 받을 이메일 주소를 입력해주세요.">
      <TextInput
        subText="이메일"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailAlert("");
        }}
        alert={!!emailAlert}
        alertText={emailAlert}
      />
      <BlackBtn
        text={"인증번호 받기"}
        onPress={handleSendCode}
        loading={sending}
        style={{ marginBottom: spacing.padding }}
      />
    </LoginContainer>
  );
};
export default FindPwEmailSendScreen;
