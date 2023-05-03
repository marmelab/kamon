import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Dice = () => {
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
        viewBox="0 0 24 24"
      >
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 6C5 5.44772 5.44772 5 6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6ZM6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM10 8.5C10 9.32843 9.32843 10 8.5 10C7.67157 10 7 9.32843 7 8.5C7 7.67157 7.67157 7 8.5 7C9.32843 7 10 7.67157 10 8.5ZM13.5 12.0001C13.5 12.8285 12.8284 13.5001 12 13.5001C11.1716 13.5001 10.5 12.8285 10.5 12.0001C10.5 11.1716 11.1716 10.5001 12 10.5001C12.8284 10.5001 13.5 11.1716 13.5 12.0001ZM15.5 10C16.3284 10 17 9.32843 17 8.5C17 7.67157 16.3284 7 15.5 7C14.6716 7 14 7.67157 14 8.5C14 9.32843 14.6716 10 15.5 10ZM17 15.5C17 16.3284 16.3284 17 15.5 17C14.6716 17 14 16.3284 14 15.5C14 14.6716 14.6716 14 15.5 14C16.3284 14 17 14.6716 17 15.5ZM8.5 17C9.32843 17 10 16.3284 10 15.5C10 14.6716 9.32843 14 8.5 14C7.67157 14 7 14.6716 7 15.5C7 16.3284 7.67157 17 8.5 17Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};

export default Dice;