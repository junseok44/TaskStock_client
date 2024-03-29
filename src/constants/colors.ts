export const palette = {
  neutral100_gray: "#FFFFFF",
  neutral200_gray: "#F2F2F2",
  neutral300_gray: "#EDEEF0",
  neutral400_gray: "#D9DADE",
  neutral500_gray: "#CCCCCF",
  neutral600_gray: "#949496",
  neutral700_gray: "#191919",

  neutral100_dark: "#FFFFFF",
  neutral200_dark: "#898989",
  neutral300_dark: "#898989",
  neutral400_dark: "#4E4E4E",
  neutral500_dark: "#000000",
  neutral600_dark: "#292929",
  neutral700_dark: "#212121",

  red: "#D0191C",
  alert_red: "rgba(208, 25, 28, 0.60);",
  blue: "#0038FF",
  green: "#4DDE48",
  candle_black: "#535358",
  candle_tick_line: "rgba(83, 83, 88, 0.30)",
  candle_bottom_graph_bar: "#9C9C9C",
  kakao: "#FEE500",
  google: "#4285F4",
  shadow: "rgba(0, 0, 0, 0.10)",
  shadowStart: "rgba(0, 0, 0, 0.15)",
} as const;

export const grayTheme = {
  name: "gray",
  palette,
  text: palette.neutral700_gray,
  textDim: palette.neutral600_gray,
  textReverse: palette.neutral100_gray,
  textDimReverse: palette.neutral300_dark,
  textDimmer: palette.neutral500_gray,
  background: palette.neutral300_gray,
  mainBtnGray: palette.neutral200_gray,
  mainBtnReversed: palette.neutral600_dark,
  subBtnGray: palette.neutral400_gray,
  textInput: palette.neutral100_gray,
  textInputBorder: palette.neutral600_gray,
  loginBackground: palette.neutral100_gray,
  box: palette.neutral100_gray,
  high: palette.red,
  low: palette.blue,
  alert: palette.alert_red,
  loadingBtn: palette.neutral500_gray,
  emailLoginBtn: palette.neutral500_dark,
  projectIconBg: palette.neutral500_dark,
  projectItemBorder: palette.neutral500_gray,
};

export const darkTheme = {
  name: "dark",
  palette,
  text: palette.neutral100_dark,
  textDim: palette.neutral300_dark,
  textDimmer: palette.neutral200_dark,
  textReverse: palette.neutral500_dark,
  textDimReverse: palette.neutral600_gray,
  background: palette.neutral500_dark,
  mainBtnGray: palette.neutral600_dark,
  mainBtnReversed: palette.neutral200_gray,
  subBtnGray: palette.neutral400_dark,
  textInput: palette.neutral600_dark,
  textInputBorder: palette.neutral600_dark,
  loginBackground: palette.neutral500_dark,
  box: palette.neutral700_dark,
  high: palette.red,
  low: palette.green,
  alert: palette.red,
  loadingBtn: palette.neutral400_dark,
  emailLoginBtn: palette.neutral200_dark,
  projectIconBg: palette.neutral500_dark,
  projectItemBorder: palette.neutral100_gray,
};
