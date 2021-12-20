import React from "react";
import { ResponsivePie } from "@nivo/pie";

export default function NivoPieChart({ data, layers }) {
  const responsivePieTheme = {
    fontFamily: "Gilroy, sans-serif",

    labels: {
      text: {
        fontSize: "0.8rem",
        fontWeight: "bold",
        color: "#36454f",
      },
    },
  };

  return (
    <ResponsivePie
      data={data}
      layers={layers}
      margin={{ top: 40, right: 0, bottom: 40, left: 0 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      enableArcLabels={true}
      arcLinkLabel={"label"}
      colors={[
        "#CFEDFF",
        "#A7D9F6",
        "#8DD5FF",
        "#74B3ED",
        "#599DDC",
        "#528CD0",
        "#3B83D8",
        "#2A63A7",
      ]}
      borderWidth={0}
      isInteractive={true}
      animate={true}
      motionConfig={"wobbly"}
      // borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLabelsSkipAngle={10}
      arcLinkLabelsSkipAngle={5}
      radialLabelsTextXOffset={9}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={6}
      radialLabelsLinkDiagonalLength={10}
      radialLabelsLinkHorizontalLength={15}
      radialLabelsLinkStrokeWidth={3}
      theme={responsivePieTheme}
      // radialLabelsLinkColor={{ from: "color" }}
      sliceLabel={(d) => d.value + "%"}
      radialLabel={(d) => d.label}
      valueFormat={(d) => d + "%"}
      sliceLabelsSkipAngle={20}
      sliceLabelsTextColor="#333333"
    />
  );
}

export { NivoPieChart };
