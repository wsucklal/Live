import React, { useState, useEffect } from 'react';
import { View,  Image, Button, ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ButtonDark } from '../../components/Buttons/Button';
import MapComponent from '../../components/Map/MapComponent';
import {P} from '../../components/Text/Text.js';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { storage, } from "../../firebase/firebase.js";


const CreateProfileScreen = () => {
  const navigation = useNavigation();
  const [venueName, setVenueName] = useState('');
  const [lon, setLongitude] = useState('');
  const [lat, setLatitude] = useState('');
  const [addressLine1, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [url, setUrl] = useState('')

  const handleCreateProfile = async () => {
    if (!venueName || !email || !password || !description || !addressLine1|| !lat|| !lon) {
      Alert.alert('Incomplete profile!', 'Please fill in all fields to create a profile.');
      return;
   }        

    const userData = {
      venueName,
      addressLine1, 
      lat,
      lon,
      email,
      password,
      description,
      tags,
      url,
    };

    //should probably add something that catches when the email is already in the adatabse and makes an alert
    const updateDatabase = async () => {
      console.log(`new session`);
      fetch(`${apiUrl}/venue/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(async (res) => {
          if (res.ok) {
            console.log(`added to the database successfully`);
            navigation.navigate('Login', {
              screen: 'venueLogin'});
          } else {
            console.log(`something went wrong ${JSON.stringify(res)}`);
          }
        });
    };

    updateDatabase();
    console.log('User Data:', userData);
  };

  const updateAddressClick = (addressLine1, longitude,latitude) => {

    setAddress(addressLine1)
    setLongitude(longitude)
    setLatitude(latitude)
    console.log("add", addressLine1, "long", longitude, "lat", latitude)
  }

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <P>Venue Name:</P>
        <TextInput
          style={styles.input}
          value={venueName}
          onChangeText={(text) => setVenueName(text)}
        />

    <P>Email:</P>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <P>Password:</P>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setpassword(text)}
        />

        <P>Description:</P>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />

  
    <MapComponent updateAddress={(addressLine1, long, lat)=>updateAddressClick(addressLine1, long, lat)}></MapComponent>
     
    <P>Tags:</P>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text>{tag}</Text>
          </View>
        ))}
      </View>
      <TextInput
        style={styles.input}
        value={tagInput}
        onChangeText={(text) => setTagInput(text)}
        onSubmitEditing={handleAddTag}
        placeholder="Add tags one by one"
      />


        <ButtonDark title={"Create Profile"} onPress={handleCreateProfile} style={{marginBottom: 5, width: 200, alignSelf: 'center'}}/>
      </View>

    </TouchableWithoutFeedback>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  mapcontainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 300, // Adjust the height as per your requirement
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  profilePicture: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#7a21c0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff', // Text color
  },
});

export default CreateProfileScreen;
