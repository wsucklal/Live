// LoginScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ButtonDark, ButtonLight } from '../../components/Buttons/Button';
import { H1, H2, H3 } from '../../components/Text/Text';

const LoginScreen = () => {

    const navigation = useNavigation();

  const handleClubberLogin = () => {
    navigation.navigate('ClubberLogin');
    console.log('Create Profile button pressed');
  };

  const handleClubLogin = () => {

    //navigation is JUST for testing, this part should be delted with merge if I forget
    navigation.navigate('ClubLogin');
    console.log('Create Profile button pressed');
  };

  return (
    <View style={styles.container}>
      <H2 style={{marginBottom: 50}}>Welcome to Live! Let's get started!</H2>

      <ButtonDark title={"I am a Clubber"} onPress={handleClubberLogin} style={{marginBottom: 5, width: 200}}/>

      <ButtonLight title={"I have a Club"} onPress={handleClubLogin} style={{marginBottom: 5, width: 200}}/>
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
