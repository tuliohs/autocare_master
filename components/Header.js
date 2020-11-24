import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/icon.png'
import { Feather } from '@expo/vector-icons';

const Header =({title,subTitle, onPress}) =>{
  return (
    <View>
      <View style={styles.header1}>
        <Image source={logo} style={{width:"40%"}}/>
        <Text style={[styles.titulo, {marginLeft: -65}]}>{title}</Text>
      </View>
      <View style={styles.header2}>
        <Text style={styles.titulo2}>{subTitle}</Text>
        <TouchableOpacity
          onPress={onPress}
        >
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header1: {
    backgroundColor: '#368c8c',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  header2: {
    backgroundColor: '#191a1e',
    display: 'flex',
    flexDirection: 'row',
    flexBasis: 56,
    padding: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  titulo: {
    fontFamily: 'Roboto',
    fontSize: 25,
    color: 'white',
    flexGrow: 1,
    backgroundColor: '#368c8c',
    textAlign: 'left',
    fontWeight: 'bold',
    padding:10,
    borderRadius:'30%'
  },
  titulo2: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'white',
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default Header