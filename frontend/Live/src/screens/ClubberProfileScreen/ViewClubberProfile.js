import React, { useState, useEffect } from 'react';
import {
Alert,
ScrollView,
View,
Text,
Image,
TouchableOpacity,
StyleSheet,
TextInput,
KeyboardAvoidingView,
Platform,
Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { retrieveUID, clearToken } from '../../handlers/authService';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL, refFromURL, deleteObject, exi} from 'firebase/storage'
import firebase from  'firebase/compat/app'
import { storage } from "../../firebase/firebase.js"


const UserProfile = () => {
const navigation = useNavigation();
const [editMode, setEditMode] = useState(false);
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [profilePic, setProfilePicture] = useState(null)
const [bio, setBio] = useState('');
const [dob, setDob] = useState('');
const [email, setEmail] = useState('');
const [isProfilePicChanged, setIsProfilePicChanged] = useState(false)
const [editableFields, setEditableFields] = useState({
  firstName: '',
  lastName: '',
  bio: '',
});
const [UID, setUID] = useState(null); // State to store the retrieved UID
const [url, setUrl] = useState('')
const [profileUri, setProfileUri] = useState(null)

const placeholderPicture = 'https://via.placeholder.com/150';
var tempUrl = ''

useEffect(() => {
  const fetchUID = async () => {
    const uid = await retrieveUID();
    setUID(uid);
    getUserData(uid);
  };

  fetchUID();
}, []); // Empty dependency array ensures it runs once when the component mounts

const handleViewReviews = () => {
  navigation.navigate('ClubberReviews');
  console.log('view clubber reviws button pressed');
};

const handleViewEvents = () => {
  navigation.navigate('ClubberEvents')
  console.log('view clubber events button pressed')
}

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
    setProfilePicture( result.assets[0].uri )
    setIsProfilePicChanged(true)

  }
};

const getUserData = async (uid) => {
  try {
    const response = await fetch(`${apiUrl}/clubber/${uid}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setBio(userData.bio);
      setDob(userData.DOB);
      setProfilePicture(userData.newURL)
      setUrl(userData.newURL)
      setEditableFields({
        firstName: userData.firstName,
        lastName: userData.lastName,
        bio: userData.bio,
      });
      console.log('this is the url', url)
    } else {
      console.log(`Something went wrong: ${JSON.stringify(response)}`);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
};

const handleEditToggle = async () => {
  if (editMode) {

    //if the profile picture has changed, upload new impage and deletre old one
    if(isProfilePicChanged){

      console.log(isProfilePicChanged)

      await deleteImage();

      const response = await fetch(profilePic);
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
           await setUrl(downloadURL)
           console.log('the new url should be ', url)
           console.log('the new temp url should be ', url)
           console.log('the donwload url is', downloadURL)
           await saveToDatabase(downloadURL)
           setIsProfilePicChanged(false)
           console.log("New Profile Pic available at", downloadURL);      
          
          });
        },
      );


    }else {

      console.log('save with no photo')
      console.log(isProfilePicChanged)
      await saveToDatabaseNoPhoto()

    }

    }

  setEditMode(!editMode);
};
const saveToDatabase = async (newUrl) => {
  // Ensure UID is available before attempting to update
  // await setUrl(newUrl)
  console.log('save with photo')
  if (UID) {
    try {
      const response = await fetch(`${apiUrl}/clubber/update/photo/${UID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers or authentication tokens as needed
        },
        body: JSON.stringify({
          email: email,
          dob: dob,
          bio: editableFields.bio,
          firstName: editableFields.firstName,
          lastName: editableFields.lastName,
          newURL: newUrl
          // Add other fields as needed
        }),
      });

      if (response.ok) {
        console.log('Changes saved successfully');
        // You may want to update local state or perform additional actions here
      } else {
        console.error('Failed to save changes:', await response.text());
        // Handle the error, show a message to the user, etc.
      }
    } catch (error) {
      console.error('Network error:', error.message);
      // Handle network errors, show a message to the user, etc.
    }

    // Fetch user data after updating to reflect changes
    getUserData(UID);

    console.log('Updated fields:', editableFields);
  } else {
    console.error('UID not available for editing');
  }
}

const saveToDatabaseNoPhoto = async () => {
  // Ensure UID is available before attempting to update
  // await setUrl(newUrl)
  console.log('the new url should be ', url)
  if (UID) {
    try {
      const response = await fetch(`${apiUrl}/clubber/update/${UID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers or authentication tokens as needed
        },
        body: JSON.stringify({
          email: email,
          dob: dob,
          bio: editableFields.bio,
          firstName: editableFields.firstName,
          lastName: editableFields.lastName,
          // Add other fields as needed
        }),
      });

      if (response.ok) {
        console.log('Changes saved successfully');
        Alert.alert(`Changes saved successfully`)
        // You may want to update local state or perform additional actions here
      } else {
        console.error('Failed to save changes:', await response.text());
        Alert.alert(`Failed to save changes`)
        // Handle the error, show a message to the user, etc.
      }
    } catch (error) {
      console.error('Network error:', error.message);
      // Handle network errors, show a message to the user, etc.
    }

    // Fetch user data after updating to reflect changes
    getUserData(UID);

    console.log('Updated fields:', editableFields);
  } else {
    console.error('UID not available for editing');
  }
}

const handleFieldChange = (field, value) => {
  setEditableFields((prevFields) => ({ ...prevFields, [field]: value }));
};
 
const handleLogout = async () => {
  try {
      await clearToken(); // clearToken clears the token
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }); // Navigate to the login screen
  } catch (error) {
      console.error('Failed to logout:', error);
      // Handle logout failure, show a message to the user, etc.
  }
};

const deleteImage = async () => {

  console.log('deleting old photo...')
  // get a reference to the current storage location of the profile pic to be deleted

  console.log('this is the url', url)
  const fileRef = ref(storage, url); // this url is coming from getDownloadURL()
  console.log('this is the url...again', url)
  // Then you do whatever you want with the ref, like remove files:
  if(fileRef){

    console.log('file to delete is', fileRef)
    deleteObject(fileRef)
  
  }


}

return (

  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
    >
      <TouchableOpacity
      onPress={editMode ? handleImagePicker : null} // Only allow onPress when edit mode is enabled
      style={styles.profilePictureContainer}>
      <Image style={styles.profilePicture} source={{ uri: profilePic }} />
    
    </TouchableOpacity>
      {/* First name input with label */}
      <Text style={styles.inputLabel}>First Name:</Text>
      <TextInput
        style={styles.editableField}
        placeholder="Enter first name..."
        value={editableFields.firstName}
        onChangeText={(text) => handleFieldChange('firstName', text)}
        editable={editMode}
      />

      {/* Last name input with label */}
      <Text style={styles.inputLabel}>Last Name:</Text>
      <TextInput
        style={styles.editableField}
        placeholder="Enter last name..."
        value={editableFields.lastName}
        onChangeText={(text) => handleFieldChange('lastName', text)}
        editable={editMode}
      />

      {/* Bio input with label */}
      <Text style={styles.inputLabel}>Bio:</Text>
      <TextInput
        style={styles.editableField}
        placeholder="Enter bio..."
        value={editableFields.bio}
        onChangeText={(text) => handleFieldChange('bio', text)}
        editable={editMode}
      />

      {/* Save Changes button */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
        <Text style={styles.editButtonText}>
          {editMode ? 'Save Changes' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={handleViewReviews}>
        <Text style={styles.editButtonText}> My Reviews
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={handleViewEvents}>
        <Text style={styles.editButtonText}> My Events
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={handleLogout}>
                    <Text style={styles.editButtonText}>Logout</Text>
                </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#f4f4f4',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: 50,
  paddingHorizontal: 20,
},
scrollView: {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
},
profilePicture: {
  borderRadius: 75,
  width: 150,
  height: 150,
  marginBottom: 10,
},
username: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
normalField: {
  fontWeight: 'normal',
  fontSize: 20,
  marginBottom: 10,
  textAlign: 'center',
},
dateContainer: {
  marginVertical: 10,
},
dateOfBirth: {
  fontSize: 16,
  color: '#333',
  textAlign: 'center',
},
editableField: {
  fontSize: 16,
  color: '#333',
  textAlign: 'center',
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  width: '100%', // Full width for editable fields
},
editButton: {
  backgroundColor: '#7a21c0',
  borderRadius: 4,
  padding: 10,
  marginBottom: 10,
  width: '100%', // Full width for the button
},
editButtonText: {
  color: '#fff',
  fontSize: 16,
  textAlign: 'center',
},
inputLabel: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
  textAlign: 'center',
},
});

export default UserProfile;
