import React from "react";
import Svg, { Polygon, G } from "react-native-svg";

type HexagonProps = {
  height?: string;
  width?: string;
  color: string;
};

const Hexagon = (props: HexagonProps) => {
  const { height = "105", width = "90", color = "black" } = props;

  return (
    <Svg height={height} width={width}>
      <G scale="1">
        <Polygon
          points="50 3,100 28,100 75,50 100,3 75,3 25"
          fill={color != null ? color : "grey"}
          strokeWidth="0"
        />
      </G>
    </Svg>
  );
};

export default Hexagon;
