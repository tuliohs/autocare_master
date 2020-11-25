import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Constants from 'expo-constants';
import Clock from '../components/Clock';
import SimpleHeader from '../components/SimpleHeader';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AlarmeScreen({ navigation }) {
  const [token, setToken] = useState();

  async function scheduleNotification({ navigation }) {
    console.log('Agendando notificação');

    const token = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Bom dia! ✌',
        body: 'Você já usou o App hoje? ✍',
      },
      trigger: {
        seconds: 2,
        repeats: true,
      },
    });

    console.log('Fim do agendamento, Token: ', token);
    setToken(token);
  }

  async function cancelNotification() {
    console.log('Cancelando notificação');

    await Notifications.cancelScheduledNotificationAsync(token);
    setToken(null);
  }
  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <SimpleHeader titulo="Alarme" onPress={goBack} />
      <Clock />
      <View style={{ padding: 30, paddingBottom: 120, backgroundColor: '#ffffff' }}>
        <Button
          title="Press to schedule a notification"
          onPress={async () => await scheduleNotification()}
        />

        {token && (
          <Button
            title="Cancel schedule notification"
            onPress={async () => await cancelNotification()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#368c8c',
  },
});
