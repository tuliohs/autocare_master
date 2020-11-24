import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { ManutencaoItems } from './Items';
import Header from '../../components/Header';
import CardItem from '../../components/CardItem';
import FloatButton from '../../components/FloatButton';
//Float Icones
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ManutencaoScreen = ({ navigation, route }) => {
  const [menuVisible, setMenuVisivle] = useState(false);
  const [veiculo, setVeiculo] = useState({
    tipo: 'SUV',
    marca: 'BMW',
    modelo: 'X1',
  });
  const goToVeiculo = () =>
    navigation.navigate('selecionarTipo', { setVeiculo: setVeiculo });
  const renderItems = ({ item }) => (
    <CardItem
      tipo={item.tipo}
      data={item.data}
      kmAtual={item.kmAtual}
      kmProximo={item.kmProximo}
    />
  );

  return (
    <View style={styles.container}>
      <Header
        title="AUTO CARE"
        subTitle={`${veiculo.tipo} ${veiculo.marca} ${veiculo.modelo}`}
        onPress={goToVeiculo}
      />
      <FlatList data={ManutencaoItems} renderItem={renderItems} />
      {!menuVisible ? (
        <FloatButton
          onPress={() => setMenuVisivle(true)}
          backgroundColor="#368c8c"
          icon={<Entypo name="dots-three-horizontal" size={24} color="white" />}
        />
      ) : (
        <View>
          <FloatButton
            onPress={() => navigation.navigate('registro')}
            bottom={370}
            icon={<MaterialIcons name="camera-alt" size={24} color="white" />}
          />
          <FloatButton
            onPress={() => navigation.navigate('alarme')}
            bottom={280}
            icon={<MaterialIcons name="access-alarm" size={24} color="white" />}
          />
          <FloatButton
            onPress={() => navigation.navigate('sos')}
            bottom={190}
            icon={<FontAwesome5 name="hands-helping" size={24} color="white" />}
          />
          <FloatButton
            bottom={100}
            onPress={() => navigation.navigate('cadastrarManutencao')}
          />
          <FloatButton
            onPress={() => setMenuVisivle(false)}
            backgroundColor="#368c8c"
            icon={<Entypo name="dots-three-vertical" size={24} color="white" />}
          />
        </View>
      )}
    </View>
  );
};

export default ManutencaoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});
