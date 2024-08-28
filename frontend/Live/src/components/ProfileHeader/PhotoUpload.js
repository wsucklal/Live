import React, { useState, useEffect } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//create a component with select image field

//THERE IS A BUG HERE THAT I CANNOT FIX I NEED HELPP!!!
const PhotoUploadComponent = ({handleProfilePictureChange}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uri, setUri] = useState('');

  useEffect(() => {

    if (selectedImage != null ){

     setUri(selectedImage.uri)
     console.log(`the uri is ${uri}`)

    }
      

  }, [selectedImage])
  

  const handleImagePicker = async () => {
    //request permission to access media libary
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access media library denied');
      return;
    }

    //one granted, use image picker API to launch media libary and let use pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const updateSelectedImage = async () => {
      return setSelectedImage({ uri: result.assets[0].uri });

    }

    //this checks if user canceld out of media libary 
    if (!result.canceled) {
      console.log(`picture uploaded`)
      console.log(JSON.stringify(result.assets[0].uri))
      const newUri = await updateSelectedImage()
      console.log(` please please work ${newUri}`)


    }


  };


  return (
    <View>
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Select Image" onPress={
        () => {handleImagePicker(); handleProfilePictureChange(uri)}
        
        } />
    </View>
  );
};

export default PhotoUploadComponent;
