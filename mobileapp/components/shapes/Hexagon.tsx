import React from "react";
import Svg, { Path, G } from "react-native-svg";

type HexagonProps = {
  height?: string;
  width?: string;
  style?: object | undefined;
  colorFill?: string | undefined;
  colorStroke?: string | undefined;
  strokeWidth?: string | undefined;
  scale?: string | undefined;
  viewBox?: string | undefined;
  dashed?: boolean;
  opacity?: string;
};

const Hexagon = (props: HexagonProps) => {
  const {
    height = "100",
    width = "90",
    colorFill = "black",
    colorStroke = "black",
    strokeWidth = "0",
    dashed = false,
    viewBox,
    opacity = "1",
    scale = "0.5",
    style,
  } = props;

  return (
    <Svg style={style} height={height} width={width} viewBox={viewBox}>
      <G scale={scale}>
        <Path
          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
          fill={colorFill != null ? colorFill : "grey"}
          stroke={colorStroke}
          stroke-dasharray={"0 4 0"}
          stroke-linecap="round"
          stroke-linejoin="round"
          fillOpacity={opacity}
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default Hexagon;
