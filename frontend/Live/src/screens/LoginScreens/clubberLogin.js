import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeToken, storeUID, retrieveToken, clearToken, storeUserType } from '../../handlers/authService';
import { ButtonDark } from '../../components/Buttons/Button';

const LoginScreen = () => {

  const navigation = useNavigation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/clubber/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      })
      .catch( error => console.log('Error:', error));
  
      // Log the full response
      console.log('Full response:', response);
  
      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Call the onLogin function passed as a prop
        const responseData =  await response.json();
        const token = responseData.token.token;
        const user = responseData.token.uid;
    
        console.log(user)
        console.log(token)
  
        let userType = 'clubber'
        storeUserType(userType)
        storeToken(token);
        storeUID(user);
  
        // Navigate to the appropriate screen after login
        // navigation.navigate('HomeScreen', { screen: 'Search Venues' });      } else {
        //   navigation.navigate('HomeScreen', {
        //     screen: 'Profile', params: {
        //         screen: 'ViewClubber'
        //     }
        // });
         
         navigation.navigate('HomeScreen');      
      } else {

        // Failed login
        // Log the error and full error response
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        Alert.alert('Login failed. Username or password is invalid.',
        )
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('Network error:', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Live! Let's get started!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <ButtonDark title={"Login"} onPress={handleLogin} style={{marginBottom: 5, width: 200}}/>
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
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#7a21c0',
    padding: 10,
    borderRadius: 5,
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
