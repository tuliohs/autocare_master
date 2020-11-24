import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  AsyncStorage
} from 'react-native';
import Constants from 'expo-constants';

import { MaterialIcons } from '@expo/vector-icons';

import SimpleHeader from '../components/SimpleHeader';

export default function SelecionarMarcaScreen({ navigation, route }) {
  const {tipo, marca, modelo, setVeiculo} = route.params;
  
  const goBack = () => {
    navigation.goBack();
    //navigation.navigate('home');
  };

  return (
    <View styles={styles.container}>
      <SimpleHeader titulo="CONFIRMAÇÃO DOS DADOS" onPress={goBack} />
      <View style={styles.infoCard}>
        <Text style={styles.texto}>
          TIPO: <Text style={styles.textoDestaque}>{tipo}</Text>
        </Text>
        <Text style={styles.texto}>
          MARCA: <Text style={styles.textoDestaque}>{marca}</Text>
        </Text>
        <Text style={styles.texto}>
          MODELO: <Text style={styles.textoDestaque}>{modelo}</Text>
        </Text>
        <Button
        title="CONFIRMAR"
        onPress={async () => {
          try {
            const veiculo = { tipo, marca, modelo } 
            setVeiculo(veiculo)

            const veiculos = await AsyncStorage
                              .getItem('@veiculos')
                              .then(JSON.parse) || []

            veiculos.push(veiculo)

            await AsyncStorage.setItem('@veiculos', JSON.stringify(veiculos))

            navigation.popToTop();
          }catch(err) {
            console.log('Falha ao tentar salvar', err)
          }
        }}
      />
      </View>
    </View>
  )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  infoCard: {
    padding: 50
  },
  texto: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999999',
    lineHeight: 26,
  },
  textoDestaque: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
