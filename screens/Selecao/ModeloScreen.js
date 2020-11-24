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

import {getModelos} from '../../utils/ApiUtils'

/*
const marcas ={
  Carro: ['116iA 1.6 TB 16V 136cv 5p', '118i Sport 1.5 TB 12V Aut. 5p', '118iA 2.0 16V 136cv 3p'],
  Moto: ['AME-110 MIX', 'AME-150 TC/ SC', 'AME-250 C1'],
  'Caminhão': ['11000 2p (diesel)', '11000 3-Eixos 2p (diesel)', '12000 2p (diesel)']
}
*/

export default function SelecionarModeloScreen({ navigation, route }) {
  const [modelos, setModelos] = useState([])
  const {tipo, marca, setVeiculo} = route.params;
  
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
    async function carregarModelos() {
      const itens = await getModelos(tipo, marca);
      setModelos(itens)
    }

    carregarModelos()
  }, [tipo, marca])

  return (
    <View style={styles.container}>
      <SimpleHeader titulo="SELECIONE A MODELO DO VEICULO" onPress={goBack} />
      <View style={styles.body}>
        <FlatList
          data={modelos}
          renderItem={({ item }) => (
            <Card
              texto={item.nome}
              onPress={() => {
                navigation.navigate('confirmacao', { tipo, marca, modelo: item.nome, setVeiculo})
              }}
            />
          )}
        />
      </View>
    </View>
  );
}
