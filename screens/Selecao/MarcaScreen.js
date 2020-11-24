import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import SimpleHeader from '../../components/SimpleHeader';
import {styles} from './Styles'
import {getMarcas} from '../../utils/ApiUtils'

/*
const marcas ={
  Carro: ['Acura', 'Agrale', 'Alfa Romeo', 'AM Gen', 'Asia Motors', 'ASTON MARTIN'],
  Moto: ['ADLY', 'AGRALE', 'AMAZONAS'],
  'Caminhão': ['AGRALE', 'BEPOBUS', 'CHEVROLET']
}
*/

export default function SelecionarMarcaScreen({ navigation, route }) {
  const [marcas, setMarcas] = useState([])
  const {tipo, setVeiculo} = route.params;
  
  const goBack = () => {
    navigation.goBack();
    //navigation.navigate('home');
  };

  const Card = ({ texto, onPress}) => {
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
    async function carregarMarcas() {
      const itens = await getMarcas(tipo);
      setMarcas(itens)
    }

    carregarMarcas()
  }, [tipo])


  return (
    <View style={styles.container}>
      <SimpleHeader titulo="SELECIONE A MARCA DO VEICULO" onPress={goBack} />
      <View style={styles.body}>
        <FlatList
          data={marcas}
          renderItem={({ item }) => (
            <Card
              texto={item.nome}
              onPress={() => {
                navigation.navigate('selecionarModelo', { tipo, marca: item.nome, setVeiculo})
              }}
            />
          )}
        />
      </View>
    </View>
  );
}


