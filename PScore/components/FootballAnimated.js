import { View, Text, Image } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect } from "react";

const FootballAnimated = () => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 2 * Math.PI}rad` }],
    };
  }, []);
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1500 }), 2, true);
  }, []);
  return (
    <Animated.View style={[reanimatedStyle]}>
      <Image
        className="rounded-full"
        style={{ width: 200, height: 200 }}
        source={require("../assets/images/football.jpg")}
      />
    </Animated.View>
  );
};

export default FootballAnimated;
