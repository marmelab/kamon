import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Hat = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg
        style={{ position: "absolute" }}
        fill="none"
        width="60%"
        height="60%"
        viewBox="0 0 48 48"
      >
        <Path
          d="M24 40C35.0457 40 44 38.2091 44 36C44 34.5611 40.7012 33.2997 35 32.5949L27 12L15 8L18 14L13 32.5949C7.2988 33.2997 4 34.5611 4 36C4 38.2091 12.9543 40 24 40Z"
          stroke="white"
          stroke-width="25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export default Hat;
