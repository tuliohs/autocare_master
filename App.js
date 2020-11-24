import React, { useEffect } from 'react';
import MainStack from './stacks/MainStack';

import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const App = () => {
  
  useEffect(() => {
    registrarPushNotification();
  }, []);

  async function registrarPushNotification() {
    if (Constants.isDevice) {
      let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') {
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      }

      if (status !== 'granted') {
        alert('Receba promoções ativando as notificações');
        return;
      }

      const expoToken = await Notifications.getExpoPushTokenAsync();
      const token = expoToken.data;
      console.log(token);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
  }

  return <MainStack />;
};
export default App;
