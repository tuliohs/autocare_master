import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Alert, Button} from 'react-native'

import Constants from 'expo-constants'

import * as Location from 'expo-location'

import MapView, {Marker} from 'react-native-maps'

import SimpleHeader from '../components/SimpleHeader'

import * as Linking from 'expo-linking'

export default function SOSScreen({navigation, router}) {
  const [localizacao, setLocalizacao] = useState()

  async function enviarLocalizacao() {
    const {status} = await Location.requestPermissionsAsync()

    if(status !== 'granted') {
      Alert.alert('Você precisa habilitar o serviço de localização do seu celular')
    } else {
      const location = await Location.getCurrentPositionAsync()

      const msg = `Olá, preciso da sua ajuda URGENTE. Estou neste endereço:
      https://www.google.com.br/maps/@${location.coords.latitude},${location.coords.longitude},18z`
      Linking.openURL(`whatsapp://send?text=${msg}&phone=+55 (31) 9 8454-7288`)
    }
  }

  async function obterLocalizacao() {
    const {status} = await Location.requestPermissionsAsync()

    if(status !== 'granted') {
      Alert.alert('Você precisa habilitar o serviço de localização do seu celular.')
    } else {
      const location = await Location.getCurrentPositionAsync()
      console.log(location)

      setLocalizacao({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })
    }
  }

  useEffect(() => {
    obterLocalizacao()
  }, [])

  return (
    <View style={styles.container}>
      <SimpleHeader
        titulo='SOS'
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <MapView
          initialRegion={localizacao}
          style={styles.mapa}
        >
          {
            localizacao && <Marker 
                              coordinate={localizacao}
                              title={'Você está aqui'}
                              description={'Informe o mecanico que você está neste local'}
                          />
          }
        </MapView>
        {
          localizacao &&
            <View style={styles.painel}>
              <Text style={styles.texto}>{`Sua latitude é ${localizacao.latitude} e sua longitude é ${localizacao.longitude}`}</Text>
            </View>
        }
      </View>
      <View style={styles.botoes}>
        <Button 
          title='Ligar'
          onPress={() => Linking.openURL('tel:(31)98454-7288')}
        />
        <Button 
          title='Enviar localizacao'
          onPress={() => enviarLocalizacao()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: Constants.statusBarHeight,
  },
  main: {
    flex: 1,
  },
  mapa: {
    width: '100%',
    height: '97%'  
  },
  painel: {
    backgroundColor: '#fff',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -100,
    padding: 5
  },
  texto: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  botoes: {
    flexBasis: 100,
    justifyContent: 'space-around'
  }
})

