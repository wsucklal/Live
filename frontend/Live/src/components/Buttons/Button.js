import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ButtonDark = ({ title, iconName, onPress, style }) => (
  <TouchableOpacity style={[styles.buttonOne, style]} onPress={onPress}>
    {iconName && (
      <Ionicons name={iconName} size={24} color="white" style={styles.icon} />
    )}
    <Text style={styles.buttonOneText}>{title}</Text>
  </TouchableOpacity>
);

export const ButtonLight = ({ title, iconName, onPress, style }) => (
  <TouchableOpacity style={[styles.buttonTwo, style]} onPress={onPress}>
    {iconName && (
      <Ionicons name={iconName} size={24} color="#4709CD" style={styles.icon} />
    )}
    <Text style={styles.buttonTwoText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonOne: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4709CD',
    padding: 10,
    borderRadius: 5,
  },
  buttonOneText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4709CD',
  },
  buttonTwoText: {
    color: '#4709CD',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});