import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TextInput, FlatList, Button, StyleSheet, ScrollView, ActivityIndicator  } from 'react-native';
import { retrieveUID, retrieveUserType } from '../../handlers/authService';
import { ButtonDark } from '../../components/Buttons/Button';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ModalPicker } from '../../components/Picker/ModalPicker';
import { ConfirmationModal} from '../../components/Modals/ConfirmationModal';

const ClubberManageReservation = () => {
    const [reservationRequests, setReservationRequests] = useState([]);
    const [userType, setUserType] = useState('');
    const [UID, setUID] = useState('');
    const [page, setPage] = useState(1);
    // const [hasNextPage, setHasNextPage] = useState(true);
    const [clubList, setClubList] = useState([])
    const [selectedClub, setSelectedClub] = useState(null);
    const [numOfGuests, setNumOfGuests] = useState(0)
    const [numOfGuestList, setNumOfGuestsList] = useState(null)
    const [submitButtonTitle, setSubmitButtonTitle] = useState("Submit")

    //const [loading, setLoading] = useState(false);

    const fetchData = async () => {

      try {
        const retrievedUserType = await retrieveUserType();
        const retrievedUID = await retrieveUID();
        setUID(retrievedUID)

        setUserType(retrievedUserType);
        setUID(retrievedUID);

        // console.log('User type retrieved successfully:', retrievedUserType);
        // console.log('UID retrieved successfully:', retrievedUID);
  
        // Fetch reservation requests from the server using fetch API
        const response = await fetch(`${apiUrl}/booking/clubber/${retrievedUID}`);
        const data = await response.json();

        const venueListResponse = await fetch(`${apiUrl}/venue/`);
        const venueListData =  await venueListResponse.json();
    
        // Transform the data for the Modal picker
        const modalPickerClubList = venueListData.map(item => ({
          label: item.venueName,
          value: item.venueId
        }));

        // Transform the data for the Modal picker
        const maxNumOfGuestList = [2,3,4,5,6,7,8,9,10,11,12].map(item => ({
          label: item,
          value: item
        }));

        setReservationRequests(data);
        setClubList(modalPickerClubList);
        setNumOfGuestsList(maxNumOfGuestList)


        console.log("Reservation Data retrieved")
          // Append new data to existing data
        // setPage(page => page + 1);
        // setHasNextPage(data.length > 0); // Check if there's more data to fetch

      } catch (error) {
        console.error('Error retrieving user type and UID:', error);
      }
      
    };

    useEffect(() => {
    
      fetchData();
    }, []);

    // const handleNextPage = () => {
    //   fetchData();
    // };

    // const handlePreviousPage = () => {
    //   if (page > 1) {
    //     setReservationRequests([]); // Clear existing data
    //     setPage(page => page - 1);
    //     fetchData();
    //   }
    // };

    const onClubValueChange = (valueIndex) => {
      console.log("retrieved clubID:", clubList[valueIndex]);
      setSelectedClub( clubList[valueIndex]);
    };
    const onNumOfGuestsValueChange = (valueIndex) => {
      console.log("retrieved numOfGuest:", numOfGuestList[valueIndex]);
      setNumOfGuests(numOfGuestList[valueIndex]);
    };

    const onSubmitConfirmation = (submit) => {
      if(submit){
        sendReservationRequest()
      }
    }
    
 // Helper function to format timestamp to a readable date string
    const formatDate = (timestampObject) => {
      if (!timestampObject || !timestampObject.seconds) {
        return 'N/A'; // Return a default value or handle accordingly
      }

      const seconds = timestampObject.seconds;
      const nanoseconds = timestampObject.nanoseconds || 0;

      // Convert the timestamp to milliseconds
      const milliseconds = seconds * 1000 + nanoseconds / 1e6;

      const date = new Date(milliseconds);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'N/A'; // Return a default value or handle accordingly
      }

      return date.toLocaleDateString(); // Adjust the formatting as needed
    };

    const sendReservationRequest = async() => {

      const retrievedUID = await retrieveUID();

      const reservationRequest =  {
        venueId:selectedClub.value,
        clubberId: retrievedUID ,
        numAttendees:numOfGuests.label,
        //date:Date.now(),
        status: "pending"
      }

      console.log(reservationRequest);

      if(numOfGuests.label== null || numOfGuests.label == undefined || selectedClub.value == null || selectedClub.value == undefined){
        console.log('missing fields');
      }else{
        try {
        

          const sendReservationRequest = await fetch(`${apiUrl}/booking/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationRequest),
          });
  
          //console.log('Raw server response:'+ JSON.stringify(sendReservationRequest));
          // Check if the update was successful
          if (sendReservationRequest.ok) {
          console.log(`Reservation made successfully`);
          // Fetch the updated reservation requests after the action is completed
          fetchData();
          Alert.alert(`Reservation made successfully`)

        } else {
          setSubmitButtonTitle("Error")
          console.error(`Error ${action}ing reservation. Status: ${updateResponse.status}`);
        }
  
        }catch(error){
          console.log("Unable to send reservation request")
          setSubmitButtonTitle("Error")
        }
      }
    }

    const getClubNameFromID = (ID) =>{
      return clubList.find(c => c.value === ID)?.label
    }


    const renderItem = ({ item }) => (
      <View style={styles.reservationRequestContainer}>
        <Text>{`Club: ${getClubNameFromID(item.venueId)}`}</Text>
        <Text>{`Booking Date: ${formatDate(item.bookingDate)}`}</Text>
        {/* <Text>{`Target Date: ${formatDate(item.targetDate)}`}</Text> */}
        <Text>{`Status: ${item.status}`}</Text>
        <Text>{`Number of Attendees: ${item.numAttendees}`}</Text>
      </View>
    );


    return (
      <View style={styles.container}>
        <Text style={styles.title}>Clubber Management Reservation</Text>
        <View style={styles.visualContainer}>
          <View style={styles.reservationContainer}>
            <Text>You are booking a reservation at:</Text>
            <ModalPicker buttonStyle={"ButtonLight"} buttonTitle={ selectedClub?selectedClub.label:"Change Club"} selectableValues={clubList} defaultValue={selectedClub} onValueChange={onClubValueChange} style={{ height: 200, width: 200 }}/>
            <Text>How many guest are you expecting? </Text>
            <ModalPicker buttonStyle={"ButtonLight"} buttonTitle={ `${numOfGuests?numOfGuests?.label:"Select Number"}`} selectableValues={numOfGuestList} defaultValue={0} onValueChange={onNumOfGuestsValueChange} style={{ height: 200, width: 200 }}/>
            {/* <ButtonDark  onPress={() => sendReservationRequest()} title={"Submit"} style={{marginBottom: 5, width: 200}}/> */}
            <ConfirmationModal  buttonStyle={"ButtonDark"} buttonTitle={submitButtonTitle} onSubmitAction={onSubmitConfirmation}/>
        
          </View>
            {/* <Text>How many guest are you expecting? </Text> */}
            {/* <ModalPicker buttonTitle={ `${numOfGuests?numOfGuests?.label:"Select Number"}`} selectableValues={numOfGuestList} defaultValue={0} onValueChange={onNumOfGuestsValueChange} style={{ height: 200, width: 200 }}/> */}
            {/* <ButtonDark  onPress={() => sendReservationRequest()} title={"Submit"} style={{marginBottom: 5, width: 200}}/> */}
            {/* <ConfirmationModal buttonStyle={"ButtonDark"} buttonTitle={"Submit"} onSubmitAction={onSubmitConfirmation}/> */}
        </View>
        <View style={[styles.visualContainer,{flex:2}]}>
        <Text>Your reservations</Text>
        {/* <SearchBar onSearch={(search) => console.log(search)}/> */}
            {/* <TextInput
                style={styles.input}
                placeholder="Username"
                value={""}
            /> */}
            <ScrollView>
                <FlatList
                data={reservationRequests}
                keyExtractor={(item, index) => (item && item.bookingId ? item.bookingId : index.toString())}
                // onEndReached={fetchData}
                // onEndReachedThreshold={0.5}
                renderItem={renderItem}
               // ListFooterComponent={renderFooter}
                />
            </ScrollView>
            <ButtonDark  onPress={() => fetchData()} title={"Refresh"} style={{marginBottom: 5, width: 200}}/>

          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Button title="Previous Page" onPress={handlePreviousPage} disabled={page === 1} />
            <Button title="Next Page" onPress={handleNextPage} disabled={!hasNextPage} />
          </View> */}
        </View>
      </View>
    );
  };

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'space-around',
      
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    reservationContainer: {
      flex:1,
      //flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    reservationRequestContainer:{
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    visualContainer: {
        flex:1,
        borderRadius:5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        padding: 10,

    },
    submitContainer: {
        height:1,
        flex: 1
    }
  });
  
  export default ClubberManageReservation