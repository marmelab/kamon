import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const GamePad = () => {
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
      <Svg style={{}} width="60%" height="60%" viewBox="0 0 24 24" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3 5C1.34315 5 0 6.34315 0 8V16C0 17.6569 1.34314 19 3 19H21C22.6569 19 24 17.6569 24 16V8C24 6.34315 22.6569 5 21 5H3ZM2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44771 22 8V16C22 16.5523 21.5523 17 21 17H3C2.44772 17 2 16.5523 2 16V8ZM8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H6V14C6 14.5523 6.44772 15 7 15C7.55228 15 8 14.5523 8 14V13H9C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11H8V10ZM16 11.5C16 12.3284 15.3284 13 14.5 13C13.6716 13 13 12.3284 13 11.5C13 10.6716 13.6716 10 14.5 10C15.3284 10 16 10.6716 16 11.5ZM18.5 13C19.3284 13 20 12.3284 20 11.5C20 10.6716 19.3284 10 18.5 10C17.6716 10 17 10.6716 17 11.5C17 12.3284 17.6716 13 18.5 13Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};

export default GamePad;
