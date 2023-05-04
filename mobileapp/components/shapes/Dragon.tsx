import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Dragon = () => {
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
        fill="white"
        width="60%"
        height="60%"
        viewBox="0 0 32 32"
      >
        <Path d="M 8 3 L 8 9 L 3 10.5 L 6.5 14 L 4 19 L 9 19 L 9 29 L 11 29 L 11 19.847656 C 12.296875 20.410156 13.660156 20.988281 16.003906 21.921875 C 16.003906 21.949219 16 21.972656 16 22 C 16 24.230469 16.699219 26.046875 17.980469 27.25 C 19.257813 28.457031 21.039063 29 23 29 L 23 27 C 21.398438 27 20.179688 26.574219 19.347656 25.796875 C 18.636719 25.125 18.15625 24.152344 18.03125 22.734375 C 19.347656 23.230469 20.53125 23.648438 21.351563 23.871094 C 21.636719 23.945313 21.929688 23.984375 22.21875 23.984375 C 24.039063 23.984375 25.800781 22.53125 26.132813 20.6875 L 27 16 L 24 18 C 19.3125 18 18.199219 15 18.199219 15 C 18.550781 14.15625 19.277344 13.558594 20.121094 13.121094 L 21 14 L 21 12.738281 C 21.1875 12.671875 21.375 12.617188 21.5625 12.5625 L 23 14 L 23 12.21875 C 23.058594 12.207031 23.125 12.191406 23.183594 12.183594 L 25 14 L 25 12 L 28 14 L 28 9.152344 C 28 7.675781 27 6.316406 25.550781 6.050781 C 25.363281 6.015625 25.179688 6 25 6 C 24.199219 6 23.484375 6.335938 22.945313 6.851563 L 21.5 3 L 20 7 L 14 7 Z M 10 6.734375 L 12.890625 8.664063 L 13.394531 9 L 23.671875 9 L 24.265625 8.34375 C 24.382813 8.214844 24.628906 8 25 8 C 25.0625 8 25.125 8.003906 25.1875 8.015625 C 25.644531 8.101563 26 8.597656 26 9.152344 L 26 10 L 25.605469 10 L 25.589844 9.992188 L 25 10 L 24.96875 10 C 24.261719 10.011719 18.03125 10.230469 16.355469 14.226563 L 16.050781 14.953125 L 16.324219 15.691406 C 16.917969 17.292969 19.199219 20 24 20 L 24.226563 20 L 24.164063 20.339844 C 24.007813 21.214844 23.097656 21.984375 22.21875 21.984375 C 22.097656 21.984375 21.980469 21.96875 21.871094 21.9375 C 18.789063 21.109375 9.894531 17.207031 9.804688 17.167969 L 9.421875 17 L 7.234375 17 L 8.289063 14.894531 L 8.933594 13.605469 L 6.78125 11.453125 L 8.578125 10.917969 L 10 10.488281 Z M 13 10 C 13 10 13.230469 12 15 12 C 16.769531 12 18 10 18 10 Z" />
      </Svg>
    </View>
  );
};

export default Dragon;
