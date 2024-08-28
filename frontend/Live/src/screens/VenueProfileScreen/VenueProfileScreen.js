import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import VenueReview from './Reviews/VenueReview';
import VenueEvent from './Events/VenueEvent';
import { retrieveUID, clearToken } from '../../handlers/authService';
import { useNavigation } from '@react-navigation/native';
import { ButtonDark,ButtonLight } from '../../components/Buttons/Button';
import { ConfirmationModal} from '../../components/Modals/ConfirmationModal';

const VenueProfileScreen = ({ route }) => {
//added for navigation
  const navigation = useNavigation();
  const [UID, setUID] = useState(null); // State to store the retrieved UID
  const [pic, setPic] = useState('https://via.placeholder.com/200');
  const [selectedComponent, setSelectedComponent] = useState('about');
  const [venueData, setVenueData] = useState([]);
  const [hasEdited, setHasEdited] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editableFields, setEditableFields] = useState({
    venueName:'',
    description:'',
    email:'',
    addressLine1:'',
    website:'',
    phoneNumber:''
  })
  useEffect(() => {
    const fetchVenueInfo = async () => {
      const uid = await retrieveUID();
      setUID(uid);
      getVenueData(uid);
    };

    fetchVenueInfo();
    console.log('avg', venueData?.avgRating)
  }, []);


  const resetEditableFields =  async() =>{
    setEditableFields({
      venueName:'',
      description:'',
      email:'',
      website:'',
      phoneNumber:''
    })
  }

  const sendEditedData =  async () => {

    console.log(UID,hasEdited,isEditing,editableFields)
    if(UID && hasEdited){
      try{
        const response = await fetch(`${apiUrl}/venue/update/${UID}`, {
          //const response = await fetch(`${apiUrl}/venue/${route.params.venueId}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body:JSON.stringify({
              venueName:editableFields.venueName == ''? venueData.venueName: editableFields.venueName,
              description:editableFields.description  == ''? venueData.description: editableFields.description,
              email:editableFields.email  == ''? venueData.email : editableFields.email,
              website:editableFields.website  == ''? venueData.website : editableFields.website,
              phoneNumber:editableFields.phoneNumber  == ''? venueData.phoneNumber : editableFields.phoneNumber,
              ratings: venueData.ratings,
              tags: venueData.tags,
              lat: venueData.lat,
              lon: venueData.lon,
              address: venueData,
              avgRating: venueData.avgRating,
              url: venueData.url
            })
          });
          if (response.ok) {
            console.log('Changes saved successfully');
            Alert.alert(`Changes saved successfully`)

            setIsEditing(false)
            setHasEdited(false)
            resetEditableFields()
            getVenueData(UID);


            // You may want to update local state or perform additional actions here
          } else {
            console.error('Failed to save changes:', await response.text());
            Alert.alert(`Failed to save changes`)
            // Handle the error, show a message to the user, etc.
          }
      }
      catch(error){
        console.error('Network error:', error.message);

      }

    }

  }

  const getVenueData = async (uid) => {

    try {
      const response = await fetch(`${apiUrl}/venue/${uid}`, {
      //const response = await fetch(`${apiUrl}/venue/${route.params.venueId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const venueData = await response.json();
        setVenueData(venueData);
        if(venueData.url != ''){
          console.log('show thi')
          setPic(venueData.url)
         
        }
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching venue data:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
        await clearToken(); // clearToken clears the token
        navigation.navigate('Welcome'); // Navigate to the login screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
    } catch (error) {
        console.error('Failed to logout:', error);
        // Handle logout failure, show a message to the user, etc.
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'about':
        return (
          <View style={styles.aboutContatiner}>
            <View style={styles.aboutSection}>
              {!isEditing && <Text style={styles.aboutText}>{venueData.description}</Text>}
              {isEditing && 
              <TextInput 
                style={styles.aboutText} 
                placeholder={hasEdited && editableFields.description !=='' ? editableFields.description: venueData.description}
                onChangeText={(text)=>{setHasEdited(true); editableFields.description = text;}}>

              </TextInput>}

              {!isEditing &&  <Text style={styles.aboutText}>Address: {venueData.addressLine1}</Text>}
              {isEditing && 
              <TextInput 
              style={styles.aboutText} 
              placeholder={hasEdited && editableFields.addressLine1 !=='' ? `Address: ${editableFields.addressLine1}`: `Address: ${venueData.addressLine1}`}
              onChangeText={(text)=>{setHasEdited(true); editableFields.addressLine1 = text;}}
              >
              </TextInput>}
            </View>
            <View style={styles.logoutContainer}>
            {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.editButtonText}>Logout</Text>
            </TouchableOpacity> */}
            <ButtonDark title={'Logout'} onPress={handleLogout} style={styles.logoutButton}></ButtonDark>

            </View>
          </View>
        );
      case 'contact':
        return (
          <View style={styles.contactSection}>
            {!isEditing &&  <Text style={styles.contactText}>Website: {venueData.website}</Text>}
            {isEditing && 
              <TextInput 
              style={styles.contactText} 
              placeholder={hasEdited && editableFields.website !=='' ? `Website: ${editableFields.website}`: `Website: ${venueData.website}`}
              onChangeText={(text)=>{setHasEdited(true); editableFields.website = text;}}
              ></TextInput>}
            
            {!isEditing &&  <Text style={styles.contactText}>Number: {venueData.phoneNumber}</Text>}
            {isEditing && 
            <TextInput 
            onChangeText={(text)=>{setHasEdited(true); editableFields.phoneNumber = text;}}
            style={styles.contactText}
            placeholder={hasEdited && editableFields.phoneNumber !=='' ? `Number: ${editableFields.phoneNumber}`: `Number: ${venueData.phoneNumber}`}
            ></TextInput>}

            {!isEditing &&  <Text style={styles.contactText}>Email: {venueData.email}</Text>}
            {isEditing && 
            <TextInput 
            onChangeText={(text)=>{setHasEdited(true); editableFields.email = text;}}
            style={styles.contactText} 
            placeholder={hasEdited && editableFields.email !=='' ? `Email: ${editableFields.email}`: `Email: ${venueData.email}`}
            ></TextInput>}
          </View>
        );
      case 'events':
        // return <VenueEvent _venueId_={route.params.venueId} />;
        return <VenueEvent _venueId_={UID} />;
      case 'reviews':
        // return <VenueReview id={route.params.venueId} />;
        return <VenueReview id={UID} />;

      default:
        return null;
    }
  };

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

    const handleEditing = () =>{
    setIsEditing(!isEditing); 
    sendEditedData()
  };



  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: pic }} style={styles.image} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {!isEditing && <Text style={styles.venueName}>{venueData.venueName}</Text>}
          {isEditing && 
            <TextInput 
              style={styles.venueName} 
              placeholder={hasEdited && editableFields.venueName !=='' ? editableFields.venueName: venueData.venueName}
              onChangeText={(text)=>{setHasEdited(true); editableFields.venueName = text;}}>
            </TextInput>}
          <View style={styles.headerContainer}>
            <View style={styles.starRating}>
              <Text style={styles.ratingText}>{venueData?.avgRating == undefined? '0':Math.round(venueData.avgRating * 10) / 10}</Text>
              <Image source={require('../../../assets/ratingStar.png')} />
            </View>
            {<ButtonDark title={!isEditing?'Edit':'Save'} onPress={() => {setIsEditing(!isEditing); sendEditedData()}} style={styles.editButton}></ButtonDark>}
            {isEditing&& <ButtonDark title={'X'} onPress={() => {setIsEditing(!isEditing); resetEditableFields()}} style={styles.editButton}></ButtonDark>}
            {/* {!hasEdited&& <ButtonDark title={!isEditing?'Edit':'Save'} onPress={() => {setIsEditing(!isEditing); sendEditedData()}} style={styles.editButton}></ButtonDark>}
            {hasEdited && <ConfirmationModal displayBtnStyle={styles.editButton} buttonStyle={"ButtonDark"} buttonTitle={!isEditing?'Edit':'Save'} onSubmitAction={handleEditing}/> } */}
          </View>

          {/* <TouchableOpacity style={styles.editButton} onPress={() => setSelectedComponent('edit')}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.componentButtons}>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'about' && styles.selectedComponent]}
          onPress={() => handleComponentClick('about')}
        >
          <Text style={styles.componentButtonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'contact' && styles.selectedComponent]}
          onPress={() => handleComponentClick('contact')}
        >
          <Text style={styles.componentButtonText}>Contact Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'events' && styles.selectedComponent]}
          onPress={() => handleComponentClick('events')}
        >
          <Text style={styles.componentButtonText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'reviews' && styles.selectedComponent]}
          onPress={() => handleComponentClick('reviews')}
        >
          <Text style={styles.componentButtonText}>Ratings</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'reservations' && styles.selectedComponent]}
          onPress={() => handleComponentClick('reservations')}
        >
          <Text style={styles.componentButtonText}>Reservations</Text>
        </TouchableOpacity> */}
      </View>
      {renderComponent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  header: {
    padding: 20,
  },
  headerContainer:{
    flexDirection: 'row',
    columnGap:10
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  venueName: {
    fontSize: 30,
    color: '#000000',
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    backgroundColor: '#4709CD',
    borderRadius: 20,
    padding: 8,
    width:'fit-content'
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  editButton: {
    backgroundColor: '#4709CD',
    borderRadius: 8,
    padding: 10,
    width:60
  },
  logoutContainer:{
    flex:1,
    height:"100%",
    justifyContent:'flex-end',
    alignItems:'center'
  },
  logoutButton: {
    //backgroundColor: '#9166ED',
    borderRadius: 8,
    padding: 10,
    width:'auto',
    //flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:'auto',
    width:100
    //position:'relative'
  },
  editButtonText: {
    color: '#FFFFFF',
    //justifyContent:'center'
  },
  componentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    columnGap:10
  },
  componentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  componentButtonText: {
    color: '#9166ED',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  selectedComponent: {
    borderBottomColor: '#9166ED',
    borderBottomWidth: 2,
  },
  aboutContatiner:{
    flex:1,
    padding: 20,
    height:400,
    //backgroundColor:'red'
  },
  aboutSection: {
    rowGap:10,
    flex:1,
    //backgroundColor:'#FFFFFF',
  },
  aboutText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#000000',
  },
  contactSection: {
    padding: 20,
    rowGap:10
  },
  contactText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#000000',
  },
});

export default VenueProfileScreen;
