import React, {useEffect} from 'react';

import {Platform} from 'react-native'
import Constants from 'expo-constants'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import ManutencaoScreen from '../screens/Home/ManutencaoScreen';
import SelecionarTipoScreen from '../screens/Selecao/TipoScreen';
import SelecionarMarcaScreen from '../screens/Selecao/MarcaScreen';
import SelecionarModeloScreen from '../screens/Selecao/ModeloScreen';
import ConfirmacaoScreen from '../screens/ConfirmacaoScreen';
import CadastrarManutencaoScreen from '../screens/Manutencao/Cadatro'
import SOSScreen from '../screens/SOSScreen'
import AlarmeScreen from '../screens/AlarmeScreen'
import RegistroOcorrencia from '../screens/RegistroOcorrencia'

const Stack = createStackNavigator();

const MainStack=()=> {
  useEffect(() => {
    registrarPushNotification()
  }, [])

  async function registrarPushNotification() {
    if(Constants.isDevice) {
      let {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)

      if(status !== 'granted') {
        let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      }

      if(status !== 'granted') {
        alert('É necessária a permissão de notificação para receber promoções dos nosso parceiros.')
        return
      }

      const expoToken = await Notifications.getExpoPushTokenAsync()
      const token = expoToken.data
      console.log(token)

      if(Platform.OS === 'android') {
        console.log('Dispositivo Android')

        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C'
        })
      }
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="home">
        <Stack.Screen name="home" component={ManutencaoScreen} />
        <Stack.Screen name="selecionarTipo" component={SelecionarTipoScreen} />
        <Stack.Screen name="selecionarMarca" component={SelecionarMarcaScreen} />
        <Stack.Screen name="selecionarModelo" component={SelecionarModeloScreen} />
        <Stack.Screen name="confirmacao" component={ConfirmacaoScreen} />
        <Stack.Screen name="cadastrarManutencao" component={CadastrarManutencaoScreen} />
        <Stack.Screen name="sos" component={SOSScreen} />
        <Stack.Screen name="alarme" component={AlarmeScreen} />
        <Stack.Screen name="registro" component={RegistroOcorrencia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack
