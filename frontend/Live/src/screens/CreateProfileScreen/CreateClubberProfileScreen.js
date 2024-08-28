import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Button, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { storage, } from "../../firebase/firebase.js"
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { ButtonDark } from '../../components/Buttons/Button.js';


const CreateProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, SetLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setUrl] = useState('')

  // useEffect(() => {
  //   // Call updateDatabase when url changes
  //   if (url !== '') {
  //     updateDatabase();
  //   }
  // }, [url]);
  

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access media library denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // here it is where we specify the allow format
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(JSON.stringify(result))
      setSelectedImage({ uri: result.assets[0].uri })

      // console.log("image uri is", result.assets[0].uri )
      // await uploadImage(result.assets[0].uri, "image");

      //upload image 

      // console.log(profilePicture)
    }
  };

  const updateDatabase = async (newURL) => {
    console.log(`uploading clubber info to database with url`, newURL);
    const userData = {
      firstName,
      lastName,
      email,
      password,
      dob,
      bio,
      newURL,
    };
  
    fetch(`${apiUrl}/clubber/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log(`clubber added to the database successfully`);
          navigation.navigate('Login', {
                screen: 'clubberLogin'});
        } else {
          console.log(`something went wrong ${JSON.stringify(res)}`);
        }
      });
  };

  async function uploadImage (uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "images/" + new Date().getTime());
   
    const uploadTask = uploadBytesResumable(storageRef, blob);
   
    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // setProgress(progress.toFixed());
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
         await updateDatabase(downloadURL)
         console.log("File available at", downloadURL);      
         return url
          // save record
        
        });
      },
    );
  
  }
  


  const handleCreateProfile = async () => {
    try{

      if (!firstName || !email || !password || !dob || !bio) {
        Alert.alert('Incomplete profile!', 'Please fill in all fields to create a profile.');
        return;
      }
      
      const newURL = await uploadImage(selectedImage.uri, 'image')

      //await updateDatabase(newURL)
      
      //this is only going to run after new url has be set....allegedly
      // console.log("selected image is", selectedImage.uri)
      

    }catch(error){
      console.error("error uploading image: ", error )
    }
   

    // console.log('User Data:', userData);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView>
      <View style={styles.container}>
        <Text>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => SetLastName(text)}
        />

        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setpassword(text)}
        />

        <Text>Date of Birth:</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={(text) => setDob(text)}
          placeholder="YYYY-MM-DD"
        />

        <Text>Bio:</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={(text) => setBio(text)}
          multiline
        />

        <Text>Profile Picture:</Text>
        <View>
          {selectedImage && (
            <Image source={selectedImage} style={{ width: 200, height: 200 }} />
          )}
          <Button title="Select Image" onPress={() => { handleImagePicker(); }} />
        </View>
        <ButtonDark title={"Create Profile"} onPress={handleCreateProfile} style={{marginBottom: 5, width: 200, alignSelf: 'center'}}/>
      </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column'
  },
  input: {
    height: 40,
    borderColor: 'gray',
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
