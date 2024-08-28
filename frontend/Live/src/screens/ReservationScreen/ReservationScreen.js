// ReservationScreen.js
import React, { useState, useEffect } from 'react';
import { retrieveUID, retrieveUserType } from '../../handlers/authService';
import { ScrollView, Text, View, Button, StatusBar } from 'react-native';
import VenueManageReservation from '../ManageReservations/ManageReservation';
import ClubberManageReservation from '../ManageReservations/ClubberManageReservation';


const styles = require('./ReservationScreenStyles');

export default function ReservationScreen() {
  const [userType, setUserType] = useState('');
  const [UID, setUID] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedUserType = await retrieveUserType();
        const retrievedUID = await retrieveUID();

        setUserType(retrievedUserType);
        setUID(retrievedUID);
      } catch (error) {
        console.error('Error retrieving user type and UID:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <View style={styles.container}>
     
      {/* Conditionally render ManageReservation based on userType */}
      {userType === 'venue' && <VenueManageReservation />}
      {userType === 'clubber' && <ClubberManageReservation />}
      {/* StatusBar component */}
      <StatusBar style="auto" />
    </View>
  );
}
