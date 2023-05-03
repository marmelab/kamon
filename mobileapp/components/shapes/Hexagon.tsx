import React from "react";
import Svg, { Path, G } from "react-native-svg";

type HexagonProps = {
  height?: string;
  width?: string;
  color: string | undefined;
};

const Hexagon = (props: HexagonProps) => {
  const { height = "100", width = "90", color = "black" } = props;

  return (
    <Svg height={height} width={width}>
      <G scale="0.5">
        <Path
          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
          fill={color != null ? color : "grey"}
          strokeWidth="0"
        />
      </G>
    </Svg>
  );
};

export default Hexagon;
