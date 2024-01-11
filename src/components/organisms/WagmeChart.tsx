import * as React from "react";
import { CandlestickChart, TCandle } from "react-native-wagmi-charts";
import { useTheme } from "styled-components/native";
import useWagmiCandleStick from "../../hooks/useWagmiCandleStick";

const mockData = [
  {
    timestamp: 1625945400000,
    open: 33575.25,
    high: 33600.52,
    low: 33475.12,
    close: 33520.11,

    // timestamp: 1625945400000,
    // open: 33575.25,
    // high: 33600.52,
    // low: 33475.12,
    // close: 33700.11,
  },
  {
    timestamp: 1625946300000,
    open: 33545.25,
    high: 33560.52,
    low: 33510.12,
    close: 33520.11,
  },
  {
    timestamp: 1625947200000,
    open: 33510.25,
    high: 33515.52,
    low: 33250.12,
    close: 33250.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
  {
    timestamp: 1625949000000,
    open: 33445.25,
    high: 33520.52,
    low: 33415.12,
    close: 33440.11,
  },
  {
    timestamp: 1625949900000,
    open: 33435.25,
    high: 33465.52,
    low: 33435.12,
    close: 33455.11,
  },
  {
    timestamp: 1625950800000,
    open: 33480.25,
    high: 33480.52,
    low: 33430.12,
    close: 33445.11,
  },
  {
    timestamp: 1625951700000,
    open: 33440.25,
    high: 33545.52,
    low: 33440.12,
    close: 33510.11,
  },
  {
    timestamp: 1625952600000,
    open: 33485.25,
    high: 33520.52,
    low: 33460.12,
    close: 33515.11,
  },
  {
    timestamp: 1625953500000,
    open: 33515.25,
    high: 33550.52,
    low: 33515.12,
    close: 33540.11,
  },
  {
    timestamp: 1625954400000,
    open: 33570.25,
    high: 33645.52,
    low: 33545.12,
    close: 33645.11,
  },
  {
    timestamp: 1625955300000,
    open: 33640.25,
    high: 33665.52,
    low: 33600.12,
    close: 33630.11,
  },
  {
    timestamp: 1625956200000,
    open: 33645.25,
    high: 33670.52,
    low: 33645.12,
    close: 33660.11,
  },
  {
    timestamp: 1625957100000,
    open: 33670.25,
    high: 33785.52,
    low: 33660.12,
    close: 33745.11,
  },
  {
    timestamp: 1625958000000,
    open: 33740.25,
    high: 33780.52,
    low: 33710.12,
    close: 33780.11,
  },
  {
    timestamp: 1625958900000,
    open: 33770.25,
    high: 33770.52,
    low: 33710.12,
    close: 33710.11,
  },
  {
    timestamp: 1625959800000,
    open: 33705.25,
    high: 33760.52,
    low: 33705.12,
    close: 33750.11,
  },
  {
    timestamp: 1625960700000,
    open: 33760.25,
    high: 33785.52,
    low: 33645.12,
    close: 33650.11,
  },
  {
    timestamp: 1625961600000,
    open: 33670.25,
    high: 33835.52,
    low: 33635.12,
    close: 33825.11,
  },
  {
    timestamp: 1625962500000,
    open: 33870.25,
    high: 33930.52,
    low: 33715.12,
    close: 33770.11,
  },
  {
    timestamp: 1625961600000,
    open: 33670.25,
    high: 33835.52,
    low: 33635.12,
    close: 33825.11,
  },
  {
    timestamp: 1625962500000,
    open: 33870.25,
    high: 33930.52,
    low: 33715.12,
    close: 33770.11,
  },
  {
    timestamp: 1625961600000,
    open: 33670.25,
    high: 33835.52,
    low: 33635.12,
    close: 33825.11,
  },
  {
    timestamp: 1625962500000,
    open: 33870.25,
    high: 33930.52,
    low: 33715.12,
    close: 33770.11,
  },
  {
    timestamp: 1625961600000,
    open: 33670.25,
    high: 33835.52,
    low: 33635.12,
    close: 33825.11,
  },
  {
    timestamp: 1625962500000,
    open: 33870.25,
    high: 33930.52,
    low: 33715.12,
    close: 33770.11,
  },
  {
    timestamp: 1625961600000,
    open: 33670.25,
    high: 33835.52,
    low: 33635.12,
    close: 33825.11,
  },
  {
    timestamp: 1625962500000,
    open: 33870.25,
    high: 33930.52,
    low: 33715.12,
    close: 33770.11,
  },
  {
    timestamp: 1625961600000,
    open: 33670.25,
    high: 33835.52,
    low: 33635.12,
    close: 33825.11,
  },
];

const mockData2 = [
  {
    timestamp: 1625945400000,
    open: 33575.25,
    high: 33600.52,
    low: 33475.12,
    close: 33700.11,
  },
  {
    timestamp: 1625946300000,
    open: 33545.25,
    high: 33560.52,
    low: 33510.12,
    close: 33520.11,
  },
  {
    timestamp: 1625947200000,
    open: 33510.25,
    high: 33515.52,
    low: 33250.12,
    close: 33250.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
  {
    timestamp: 1625949000000,
    open: 33445.25,
    high: 33520.52,
    low: 33415.12,
    close: 33440.11,
  },
  {
    timestamp: 1625949900000,
    open: 33435.25,
    high: 33465.52,
    low: 33435.12,
    close: 33455.11,
  },
  {
    timestamp: 1625950800000,
    open: 33480.25,
    high: 33480.52,
    low: 33430.12,
    close: 33445.11,
  },
  {
    timestamp: 1625951700000,
    open: 33440.25,
    high: 33545.52,
    low: 33440.12,
    close: 33510.11,
  },
  {
    timestamp: 1625952600000,
    open: 33485.25,
    high: 33520.52,
    low: 33460.12,
    close: 33515.11,
  },
  {
    timestamp: 1625953500000,
    open: 33515.25,
    high: 33550.52,
    low: 33515.12,
    close: 33540.11,
  },
  {
    timestamp: 1625954400000,
    open: 33570.25,
    high: 33645.52,
    low: 33545.12,
    close: 33645.11,
  },
  {
    timestamp: 1625955300000,
    open: 33640.25,
    high: 33665.52,
    low: 33600.12,
    close: 33630.11,
  },
  {
    timestamp: 1625956200000,
    open: 33645.25,
    high: 33670.52,
    low: 33645.12,
    close: 33660.11,
  },
  {
    timestamp: 1625957100000,
    open: 33670.25,
    high: 33785.52,
    low: 33660.12,
    close: 33745.11,
  },
  {
    timestamp: 1625958000000,
    open: 33740.25,
    high: 33780.52,
    low: 33710.12,
    close: 33780.11,
  },
  {
    timestamp: 1625958900000,
    open: 33770.25,
    high: 33770.52,
    low: 33710.12,
    close: 33710.11,
  },
  {
    timestamp: 1625959800000,
    open: 33705.25,
    high: 33760.52,
    low: 33705.12,
    close: 33750.11,
  },
  {
    timestamp: 1625960700000,
    open: 33760.25,
    high: 33785.52,
    low: 33645.12,
    close: 33650.11,
  },
  {
    timestamp: 1625961600000,
    open: 33670.25,
    high: 33835.52,
    low: 33635.12,
    close: 33825.11,
  },
  {
    timestamp: 1625962500000,
    open: 33870.25,
    high: 33930.52,
    low: 33715.12,
    close: 33770.11,
  },
  {
    timestamp: 1625961600000,
    open: 33670.25,
    high: 33835.52,
    low: 33635.12,
    close: 33825.11,
  },
  {
    timestamp: 1625962500000,
    open: 33870.25,
    high: 33930.52,
    low: 33715.12,
    close: 34000.11,
  },
];

export const CustomWidthContext = React.createContext({
  width: 0,
  height: 0,
});

export default function WagmeChart() {
  const { data } = useWagmiCandleStick();
  const theme = useTheme();

  return (
    <>
      <CandlestickChart.Provider data={data}>
        <CandlestickChart>
          <CandlestickChart.Candles
            useAnimations={true}
            positiveColor={theme.palette.red}
            negativeColor={theme.palette.blue}
          />
          <CandlestickChart.Crosshair>
            <CandlestickChart.Tooltip />
          </CandlestickChart.Crosshair>
        </CandlestickChart>
      </CandlestickChart.Provider>
    </>
  );
}
