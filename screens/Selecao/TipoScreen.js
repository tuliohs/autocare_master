import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import SimpleHeader from '../../components/SimpleHeader';
import {styles} from './Styles'
import { getTipos } from '../../utils/ApiUtils';

/*
const veiculos = [
  { tipo: 'Moto', marca: 'Yamaha', modelo: 'MT07' },
  { tipo: 'Caminhão', marca: 'GMC', modelo: '3500 HD Turbo' },
  { tipo: 'Carro', marca: 'Chery', modelo: 'Tiggo 7 TXS' },
  { tipo: 'Moto', marca: 'Honda', modelo: 'Shadow 750' },
];
*/
const SelecionarTipoScreen = ({ navigation, route }) => {
  const [tipos, setTipos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  const { setVeiculo } = route.params;
  const goBack = () =>     navigation.goBack()

  const Card = ({ texto, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <Text style={styles.text}>{texto}</Text>
          <MaterialIcons name="navigate-next" size={24} color="black" />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    async function carregarTipos() {
      const itens = await getTipos();
      setTipos(itens);
    }

    async function carregarVeiculos() {
      const itens = await AsyncStorage.getItem('@veiculos').then(JSON.parse);
      setVeiculos(itens);
    }

    carregarTipos();
    carregarVeiculos();
  }, []);

  return (
    <View style={styles.container}>
      <SimpleHeader titulo="SELECIONE O TIPO DO VEICULO" onPress={goBack} />
      <View style={styles.body}>
        <FlatList
          data={tipos}
          renderItem={({ item }) => (
            <Card
              texto={`Novo ${item.nome}`}
              onPress={() =>
                navigation.navigate('selecionarMarca', {
                  tipo: item.nome,
                  setVeiculo,
                })
              }
            />
          )}
        />

        <FlatList
          data={veiculos}
          renderItem={({ item }) => (
            <Card
              texto={` ${item.tipo} ${item.marca} ${item.modelo}`}
              onPress={() => {
                setVeiculo(item);
                navigation.goBack();
              }}
            />
          )}
        />
      </View>
    </View>
  );
};
export default SelecionarTipoScreen;

