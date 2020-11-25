import React, { Component, useState, useEffect } from 'react';
import { AppRegistry, View, Text, StyleSheet, Platform } from 'react-native';

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const daysArray = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    if (hour > 12) hour = hour - 12;
    if (hour == 0) hour = 12;
    if (new Date().getHours() < 12) am_pm = 'am';

    setCurrentTime(hour + ':' + minutes + ':' + seconds + ' ' + am_pm);

    daysArray.map((item, key) => {
      if (key == new Date().getDay()) {
        setCurrentDay(item.toUpperCase());
      }
    });
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      getCurrentTime();
    }, 1000); //Substitui componentDidAmount
    return () => clearInterval(intervalo); //Substitui componentWillUnmount
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.daysText}>{currentDay}</Text>
        <Text style={styles.timeText}>{currentTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 50,
    color: '#d3d3d3',
  },
  daysText: {
    color: '#ffffff',
    fontSize: 25,
    paddingBottom: 0,
    marginLeft: 150,
  },
});
