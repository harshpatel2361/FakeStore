import Toast from "react-native-toast-message";
import { color } from "../constants";

export const showToast = ({
  type,
  text1,
  text2,
  position = 'top',
  topOffset,
  visibilityTime = 3000,
  swipeable = true,
}) => {
  return Toast.show({
    type: type,
    text1,
    text1Style: {
      fontSize: 18,
      fontWeight: '700',
      color: color.black,
    },
    text2,
    position,
    topOffset: topOffset || 100,
    visibilityTime,
    swipeable,
  });
};
