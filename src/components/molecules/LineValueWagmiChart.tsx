import React from "react";
import { Circle, Line, Svg } from "react-native-svg";
import { useTheme } from "styled-components/native";

import { palette } from "../../constants/colors";
import { View } from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { IsoString } from "../../@types/calendar";

const DotDataComponent = (props: any) => {
  const { x, y, datum } = props;

  return (
    <Svg>
      <Circle
        cx={x}
        cy={y}
        r={15} // Set the radius to be slightly larger than the inner circle
        fill="rgba(255, 0, 0, 0.2)" // Slightly transparent red fill
      />
      <Circle
        cx={x}
        cy={y}
        r={5} // Set the radius to be slightly larger than the inner circle
        fill={palette.red} // Slightly transparent red fill
      />
    </Svg>
  );
};

export default function LineValueChart({
  data,
  width,
  height,
}: {
  data: {
    date: IsoString;
    end: number;
  }[];
  width: number;
  height: number;
}) {
  const theme = useTheme();

  if (data.length === 0) {
    const oneThirdLineHeight = height / 3;
    const twoThirdLineHeight = (height * 2) / 3;

    return (
      <Svg>
        <Line
          x1={0}
          x2={width}
          y1={oneThirdLineHeight}
          y2={oneThirdLineHeight}
          stroke={theme.palette.neutral500_gray}
        />
        <Line
          x1={0}
          x2={width}
          y1={twoThirdLineHeight}
          y2={twoThirdLineHeight}
          stroke={theme.palette.neutral500_gray}
        />
      </Svg>
    );
  }

  const lineData = data.map((item) => ({
    timestamp: new Date(item.date).getTime(),
    value: Math.floor(item.end * 1000) / 1000,
    y: Math.floor(item.end * 1000) / 1000,
  }));

  const maxY = Math.max(...lineData.map((item) => item.y));
  const minY = Math.min(...lineData.map((item) => item.y));
  const twoThirds = minY + ((maxY - minY) * 2) / 3;
  const oneThird = minY + ((maxY - minY) * 1) / 3;

  let maxYWithPadding = maxY + (maxY - minY) / 3;
  let minYWithPadding = minY - (maxY - minY) / 3;

  if (maxYWithPadding === minYWithPadding) {
    maxYWithPadding = maxYWithPadding + 1;
    minYWithPadding = minYWithPadding - 1;
  }

  return (
    <LineChart.Provider data={lineData}>
      <LineChart width={width} height={height}>
        <LineChart.Path color={theme.palette.red}>
          <LineChart.Tooltip at={3} />
        </LineChart.Path>
        <Svg>
          <Line
            x1={0}
            x2={width}
            y1={oneThird}
            y2={oneThird}
            stroke={theme.palette.neutral500_gray}
          />
          <Line
            x1={0}
            x2={width}
            y1={twoThirds}
            y2={twoThirds}
            stroke={theme.palette.neutral500_gray}
          />
        </Svg>
        <LineChart.CursorCrosshair color={theme.palette.red} />
      </LineChart>
    </LineChart.Provider>
  );
}
