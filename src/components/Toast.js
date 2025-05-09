import Toast from "react-native-toast-message";
import { color } from "../constants";

export const showToast = ({
  type,
  text1,
  text2,
  position = 'top',
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
    visibilityTime,
    swipeable,
  });
};
