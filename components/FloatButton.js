import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

 const FloatButton = ({ 
  onPress,
  bottom = 15,
  icon = (<MaterialIcons name="add" size={35} color='white' />),
  backgroundColor= '#191a1e'
}) => {
  return (
    <TouchableHighlight
      style={[styles.floatButton, {bottom},{backgroundColor}]}
      onPress={onPress}
      underlayColor='#f18d3a'
      >
      {icon}
    </TouchableHighlight>
  );
}

export default  FloatButton

const styles = StyleSheet.create({
  floatButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    right: 15,
    borderRadius: 100,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 3,
  },
});
