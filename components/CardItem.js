import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


 const CardItem =({ tipo, data, kmAtual, kmProximo }) =>{
  const icon = () => {
    switch (tipo) {
      case 'ÓLEO':
        return (
          <FontAwesome5
            name="oil-can"
            size={24}
            color="black"
            style={styles.iconCard}
          />
        );
      case 'PNEU D.':
        return (
          <AntDesign
            name="upcircleo"
            size={24}
            color="black"
            style={styles.iconCard}
          />
        );
      case 'PNEU T.':
        return (
          <AntDesign
            name="downcircleo"
            size={24}
            color="black"
            style={styles.iconCard}
          />
        );
      case 'BATERIA':
        return (
          <MaterialCommunityIcons
            name="car-battery"
            size={24}
            color="black"
            style={styles.iconCard}
          />
        );
      default:
        return (
          <Fontisto
            name="car"
            size={24}
            color="black"
            style={styles.iconCard}
          />
        );
    }
  };

  return (
    <View style={styles.card}>
      {icon()}
      <View style={styles.infoCard}>
        <Text style={styles.tituloCard}>TROCA DE {tipo}</Text>
        <Text style={styles.detalhesCard}>
          Realizado em <Text style={styles.destaqueCard}>{data}</Text>
        </Text>
        <Text style={styles.detalhesCard}>
          com <Text style={styles.destaqueCard}>{kmAtual} Km</Text>
        </Text>
        <Text style={styles.detalhesCard}>
          próxima troca{' '}
          <Text style={styles.destaqueCard}>
            {kmProximo} ({kmProximo - kmAtual} Km)
          </Text>
        </Text>
      </View>
    </View>
  );
}
export default CardItem

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#043d5d',
    padding: 15,
    borderLeftWidth: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  iconCard: {
    flexBasis: 56,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  infoCard: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  tituloCard: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  detalhesCard: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999999',
    lineHeight: 26,
  },
  destaqueCard: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
