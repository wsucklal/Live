import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeToken, storeUID, retrieveToken, clearToken, storeUserType } from '../../handlers/authService';



const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/venue/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });
  
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
        let userType = 'venue'
        storeToken(token);
        storeUID(user);
        storeUserType(userType);
  
        // Navigate to the appropriate screen after login
        navigation.navigate('Profile');
      } else {
        // Failed login
        // Log the error and full error response
        const errorText = await response.text();
        console.error('Login failed:', errorText);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('Network error:', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Club Profile Created Successfully! Let's get started!</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
