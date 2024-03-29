import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { TRootState } from "../../store/configureStore";
import { checkAndRenewTokens } from "../authUtils/tokenUtils";

export const setPrivateThunk = createAsyncThunk(
  "user/setPrivateThunk",
  async (isPrivate: boolean, { rejectWithValue, getState, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const rootState = getState() as TRootState;
    const { accessToken } = rootState.auth;

    try {
      const data = await client.patch(
        "sns/private",
        {
          private: isPrivate,
        },
        {
          accessToken: accessToken,
        }
      );
      //   console.log("비공개 설정 response: ", data);
      if (data.result === "success") {
        return isPrivate;
      } else {
        return rejectWithValue(data.result);
      }
    } catch (error) {
      console.log("비공개 설정 실패 error");
      return rejectWithValue(error.response.data);
    }
  }
);
