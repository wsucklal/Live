// LoginScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ButtonDark, ButtonLight } from '../../components/Buttons/Button';

const LoginScreen = () => {

    const navigation = useNavigation();

  const handleLogin = () => {
    // should take user to a log in page not yet created
    navigation.navigate('venueLogin');
    console.log('Login button pressed');
  };

  const handleCreateProfile = () => {
    // Implement your create profile logic here
    navigation.navigate('CreateClubProfile');
    console.log('Create Profile button pressed');
  };

  return (
    <View style={styles.container}>

      <ButtonDark title={"Login"} onPress={handleLogin} style={{marginBottom: 5, width: 200}}/>

      <ButtonLight title={"Create Club"} onPress={handleCreateProfile} style={{marginBottom: 5, width: 200}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your background color
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7a21c0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
