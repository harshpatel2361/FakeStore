import { Dimensions } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";


const deviceWidth = Dimensions.get('window').width;
export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', width: deviceWidth - 30 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        width: deviceWidth - 60,
      }}
      text2Style={{
        fontSize: 14,
        color: '#333',
        flexWrap: 'wrap',
        width: deviceWidth - 60,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red', width: deviceWidth - 30 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        width: deviceWidth - 60,
      }}
      text2Style={{
        fontSize: 14,
        color: '#333',
        flexWrap: 'wrap',
        width: deviceWidth - 60,
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#3498db', width: deviceWidth - 30 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        width: deviceWidth - 60,
      }}
      text2Style={{
        fontSize: 14,
        color: '#333',
        flexWrap: 'wrap',
        width: deviceWidth - 60,
      }}
    />
  ),
};

