import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { RadioButton, TextInput } from 'react-native-paper';
import SimpleHeader from '../../components/SimpleHeader';

const Cadatro = ({ navigation, route }) => {
  const [tipo, setTipo] = useState('Óleo');
  const [descricao, setDescricao] = useState('');
  const [kmAtual, setKmAtual] = useState('');
  const [proximaTroca, setProximaTroca] = useState('');

  return (
    <View style={styles.container}>
      <SimpleHeader
        titulo="NOVA MANUTENÇÃO"
        onPress={() => navigation.goBack()}
      />
      <RadioButton.Group onValueChange={(value) => setTipo(value)} value={tipo}>
        <RadioButton.Item label="Óleo" value="Óleo" />
        <RadioButton.Item label="Bateria" value="Bateria" />
        <RadioButton.Item label="Pneu" value="Pneu" />
      </RadioButton.Group>
      <View style={styles.main}>
        <TextInput
          mode="outlined"
          label="Descrição da manutenção"
          placeholder="Pneu Dian. Esq."
          onChange={(value) => setDescricao(value)}
        />
        <TextInput
          mode="outlined"
          label="Km Atual"
          placeholder="2000"
          keyboardType="decimal-pad"
          onChange={(value) => setKmAtual(value)}
        />
        <Text style={styles.text}>{proximaTroca}</Text>
        <Button title="CONFIRMAR"
        
        />
      </View>
    </View>
  );
};
export default Cadatro;

const styles = StyleSheet.create({
  main: {
    padding: 20,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 26,
  },
});
