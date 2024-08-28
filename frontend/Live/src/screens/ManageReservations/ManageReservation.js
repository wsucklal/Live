import React, { useEffect, useState } from 'react';
import { Alert, View, Text, FlatList, Button, StyleSheet, ScrollView } from 'react-native';
import { H1, H2, H3, P } from '../../components/Text/Text.js'
import { retrieveUID, retrieveUserType } from '../../handlers/authService';


const ReservationManagement = () => {
  const [reservationRequests, setReservationRequests] = useState([]);
  const [userType, setUserType] = useState('');
  const [UID, setUID] = useState('');
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  const fetchData = async () => {
    try {
      const retrievedUserType = await retrieveUserType();
      const retrievedUID = await retrieveUID();

      setUserType(retrievedUserType);
      setUID(retrievedUID);

      console.log('User type retrieved successfully:', retrievedUserType);
      console.log('UID retrieved successfully:', retrievedUID);

      // Fetch reservation requests from the server using fetch API
      const response = await fetch(`${apiUrl}/booking/venue/${retrievedUID}`);
      const data = await response.json();
  
      setReservationRequests(data);
      // console.log(data)

      const approved = data.filter(item => item.status === 'accepted');
      const rejected = data.filter(item => item.status === 'rejected');
      const pending = data.filter(item => item.status !== 'accepted' && item.status !== 'rejected');
      
      setApprovedRequests(approved);
      setRejectedRequests(rejected);
      setPendingRequests(pending);
      console.log("approved reservations ", approved)
      console.log("rejected reservations ", rejected)
      console.log("pending reservations ", pending)
      
    } catch (error) {
      console.error('Error retrieving user type and UID:', error);
    }
  };
  useEffect(() => {
  
    fetchData();
  }, []);

  const handleAction = async (item, reservationId, action) => {
    try {
      // Update the status field based on the action
      const updatedItem = {
        ...item,
        status: action === 'accept' ? 'accepted' : 'rejected',
      };
      Alert.alert(`Reservation ${action}ed`)

  
      // Send a request to the server to update the reservation status
      const updateResponse = await fetch(`${apiUrl}/booking/${reservationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
  
      console.log('Raw server response:'+ JSON.stringify(updateResponse));
      // Check if the update was successful
      if (updateResponse.ok) {
      console.log(`Reservation ${reservationId} ${action}ed successfully`);
      // Fetch the updated reservation requests after the action is completed
      fetchData();
    } else {
      console.error(`Error ${action}ing reservation. Status: ${updateResponse.status}`);
    }

    } catch (error) {
      console.error(`Error ${action}ing reservation:`, error);
    }
  };
  
  
  const renderItem = ({ item }) => (
    <View style={styles.reservationContainer}>
      <Text>{`Booking Date: ${formatDate(item.bookingDate)}`}</Text>
      <Text>{`Target Date: ${formatDate(item.targetDate)}`}</Text>
      <Text>{`Status: ${item.status}`}</Text>
      <Text>{`Number of Attendees: ${item.numAttendees}`}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={() => handleAction(item, item.bookingId, 'accept')} />
        <Button title="Reject" onPress={() => handleAction(item, item.bookingId, 'reject')} />
      </View>
    </View>
  );
  
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


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation Management</Text>
      <View>
      <P>Pending Requests</P>
      <FlatList
        data={pendingRequests}
        keyExtractor={(item, index) => (item && item.bookingId ? item.bookingId : index.toString())}
        renderItem={renderItem}
      />
      <P style={styles.sectionTitle}>Rejected Requests</P>
        <FlatList
          data={rejectedRequests}
          keyExtractor={(item, index) => (item && item.bookingId ? item.bookingId : index.toString())}
          renderItem={renderItem}
        />
      <P style={styles.sectionTitle}>Approved Requests</P>
        <FlatList
          data={approvedRequests}
          keyExtractor={(item, index) => (item && item.bookingId ? item.bookingId : index.toString())}
          renderItem={renderItem}
        />
      </View>
     
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50
  },
  reservationContainer: {
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
 
});

export default ReservationManagement;

