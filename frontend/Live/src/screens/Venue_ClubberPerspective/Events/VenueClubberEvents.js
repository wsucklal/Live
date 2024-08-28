import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import EventItem from './EventItem';
import { retrieveUID } from '../../../handlers/authService';

const VenueClubberEvents = ({ id }) => {
    const [clubberId, setClubberId] = useState('');
    const [clubberData, setClubberData] = useState([])
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchVenueEvents = async () => {
          getVenueEvents();
        };
    
        fetchVenueEvents();

        const getClubberId = async () => {
            try {
              const id = await retrieveUID();
              setClubberId(id);
            } catch (error) {
              console.error('Error fetching clubber ID:', error);
            }
          };
      
          getClubberId();
      }, []);
    
      const getVenueEvents = async () => {
        try {
          const response = await fetch(`${apiUrl}/event/venue/${id}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          });
    
          if (response.ok) {
            const eventData = await response.json();
            setEvents(eventData);
          } else {
            console.log(`Something went wrong: ${JSON.stringify(response)}`);
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };

      return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
    
            <View style={styles.reviewsContainer}>
              {/* Display events */}
              {events.map((event, index) => (
                <EventItem key={index} event={event} _clubberId_={clubberId} />
              ))}
            </View>
    
          </ScrollView>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF', // Background color
      padding: 20,
      paddingBottom: 500,
    },
    scrollView: {
      padding: 20,
      paddingBottom: 315,
    },
    addReviewButton: {
      backgroundColor: '#4709CD', // Secondary color
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
    addReviewButtonText: {
      color: '#fff', // White text color
      textAlign: 'center',
      fontSize: 16,
    },
    reviewsContainer: {
      marginTop: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });


export default VenueClubberEvents;
